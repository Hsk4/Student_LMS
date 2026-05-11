import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.json(), 
  transports: [
    
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

 

export const logActivity = (action: 'signup' | 'login' | 'logout', email: string) => {
    const messages = {
        signup: `New User Registered successfully: ${email}`,
        login: `User logged in successfully: ${email}`,
        logout: `User logged out: ${email}`
    };
    
    logger.info(messages[action]);
};