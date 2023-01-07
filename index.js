const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember } = Partials

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages],
    Partials: [User, Message, GuildMember, ThreadMember,]
});


const { loadEvents } = require("./Handlers/eventHandler")

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.subCommands = new Collection();

loadEvents(client);


client.login(client.config.token)
.then(() => {
    console.log(`Client logged in as ${client.user.tag}`);
    const activities = [
      
        { name: `/chess-info`, type: 3 },

        { name: `${client.guilds.cache.size} Servers`, type: 5 },

        { name: `${client.users.cache.size} Users`, type: 4 },
    
        //Alle types
        // 0 = Playing
        // 1 = Streaming
        // 2 = Listening	
        // 3 = Watching
        // 4 = Custom
        // 5 = Competing

        ];
        const status = [
            'online',
            'dnd',
            'idle',
        ];
        let i = 0;
        setInterval(() => {
            if(i >= activities.length) i = 0
            client.user.setActivity(activities[i])
            i++;
        }, 5000);
      
        let s = 0;
        setInterval(() => {
            if(s >= activities.length) s = 0
            client.user.setStatus(status[s])
            s++;
        }, 5000);
    })
.catch((err) => console.log(err));
