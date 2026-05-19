import mongoose from 'mongoose';

type DnsJsonAnswer = {
    data: string;
}

const stripQuotes = (value: string) => value.trim().replace(/^['"]|['"]$/g, '');

const parseQueryString = (value: string) => new URLSearchParams(value);

const resolveAtlasUri = async (mongoUri: string) => {
    if (!mongoUri.startsWith('mongodb+srv://')) {
        return mongoUri;
    }

    const uri = new URL(mongoUri);
    const host = uri.hostname;
    const appName = uri.searchParams.get('appName') ?? 'Cluster0';

    const srvUrl = `https://cloudflare-dns.com/dns-query?name=_mongodb._tcp.${host}&type=SRV`;
    const txtUrl = `https://cloudflare-dns.com/dns-query?name=${host}&type=TXT`;

    const [srvResponse, txtResponse] = await Promise.all([
        fetch(srvUrl, { headers: { accept: 'application/dns-json' } }),
        fetch(txtUrl, { headers: { accept: 'application/dns-json' } }),
    ]);

    if (!srvResponse.ok) {
        throw new Error(`Unable to resolve SRV records for ${host}`);
    }

    const srvJson = await srvResponse.json() as { Answer?: DnsJsonAnswer[] };
    const srvAnswers = srvJson.Answer ?? [];

    if (!srvAnswers.length) {
        throw new Error(`No SRV records returned for ${host}`);
    }

    const hosts = srvAnswers.map((answer) => {
        const parts = answer.data.trim().split(/\s+/);
        const target = parts.at(-1);
        const port = parts.at(-2);

        if (!target || !port) {
            throw new Error(`Invalid SRV record data: ${answer.data}`);
        }

        return `${target}:${port}`;
    });

    const txtJson = txtResponse.ok
        ? await txtResponse.json() as { Answer?: DnsJsonAnswer[] }
        : null;

    const txtParams = new URLSearchParams();
    txtJson?.Answer?.forEach((answer) => {
        const raw = answer.data.replace(/^"|"$/g, '');
        raw.split('&').forEach((pair) => {
            const [key, value] = pair.split('=');
            if (key && value) {
                txtParams.set(key, value);
            }
        });
    });

    txtParams.set('tls', 'true');
    txtParams.set('appName', appName);

    const username = uri.username ? decodeURIComponent(uri.username) : '';
    const password = uri.password ? decodeURIComponent(uri.password) : '';
    const credentials = username ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@` : '';
    const path = uri.pathname && uri.pathname !== '/' ? uri.pathname : '/';
    const query = txtParams.toString();

    return `mongodb://${credentials}${hosts.join(',')}${path}?${query}`;
};

const connectionDB = async () => {
    try {
        const mongoUri = stripQuotes(process.env.MONGODB_URI ?? process.env.MONGO_URI ?? '');
        if (!mongoUri) {
            throw new Error('Missing MONGODB_URI in environment');
        }

        const directUri = await resolveAtlasUri(mongoUri);
        await mongoose.connect(directUri, { serverSelectionTimeoutMS: 2500 });
        console.log("MONGODB Connected Successfully!");
    } catch (error:unknown) {
        console.log("MONGODB connection FAILED ", error);

        try {
                await mongoose.disconnect().catch(() => undefined);
                console.log('Trying local MongoDB fallback...');
                await mongoose.connect(stripQuotes(process.env.MONGODB_URI_LOCAL ?? 'mongodb://127.0.0.1:27017/student_lms'), {
                    serverSelectionTimeoutMS: 2500,
                });
            console.log("MONGODB fallback connected successfully!");
        } catch (fallbackError: unknown) {
            console.log("MONGODB fallback connection FAILED ", fallbackError);
        }
    }
};

export default connectionDB;