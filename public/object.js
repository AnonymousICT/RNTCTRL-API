// this is a template for how I want my data to be structured
let fakeData = {
    User: "cmburns", //login string
    Name: "Charles Montgomery Burns", //string
    Email: "cmburns@gmaill.com", //string 
    Properties: [ //array of objects
        {
            id: "01", //generated
            propertyAddress: "742 Evergreen Terrace Springfield USA", //string
            tenantName: "Homer Simpson", //name of tenant string
            tenantContact: { //object
                phone: 555-555-5555,
                email: "hSimpson@nukulear.com"
            },
            lease: 12 , //how long is the lease? number
            rent: 2000, //monthly rent number
            maintenence: [ //array of objects 
                {
                    message: "The sink handle broke in the main kitchen", // string
                    timestamp: "timestamp here", //self-explanitory 
                    completed: false //boolean
                },
                {
                    message: "The roof is leaking",
                    timestamp: "othertimestamp",
                    completed: true
                }
            ]
        },
        {
            id: "02",
            propertyAddress: "31 Spooner Street Quahog Rhode Island",
            tenantName: "Peter Griffin", //name of tenant
            tenantContact: {
                phone: 555-555-5678,
                email: "p.griffin@pawtucket.com"
            },
            lease: 12 , //how long is the lease?
            rent: 1000, //monthly rent
            maintenence: [
                {
                    message: "The garage door keeps getting jammed.",
                    timestamp: "timestamp here",
                    completed: false
                },
                {
                    message: "The septic tank blew up",
                    timestamp: "othertimestamp",
                    completed: false
                }
            ]
        }
    ]
}