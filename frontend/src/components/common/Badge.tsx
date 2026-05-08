import React from 'react'

type BadgeType = "default " | "success" | "danger" | "warning" | "info"


type BadgeProps = {
    label : string,
    type : BadgeType
}

const Badge: React.FC<BadgeProps> = ({ label, type = "default" }) => {
    

    const styles : Record<string, string> = {
        "default" : "bg-gray-200 text-gray-800",
        "success" : "bg-green-200 text-green-800",
        "danger" : "bg-red-200 text-red-800",
        "warning" : "bg-yellow-200 text-yellow-800",
        "info" : "bg-blue-200 text-blue-800"
};


    return (
 <span className={`px-2 py-1 text-sm rounded ${styles[type]}`}>
      {label}
    </span>    
    )
}

export default Badge
// export default React.memo(Badge;