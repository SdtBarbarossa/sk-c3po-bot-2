const Discord = require('discord.js');

const urls = [
    'http://schattenkollektiv.gear.host/api/weekly/GetSpendengott',
    'http://schattenkollektiv.gear.host/api/weekly/GetPadawan',
    'http://schattenkollektiv.gear.host/api/weekly/GetStaffel',
    'http://schattenkollektiv.gear.host/api/weekly/GetAdmiral',
    'http://schattenkollektiv.gear.host/api/weekly/GetGladiator'
];

module.exports = async (client) => {
    try {

        var embed = new Discord.RichEmbed();

        const guild = client.guilds.get(process.env.GUILD_ID);
        
        var data = await Promise.all(urls.map(requestAsync));

        console.log("data", data);

        var report = "";

        //Spendengott
        let spendengott = guild.roles.find('name', 'Spendengott');
        spendengott.members.forEach(
            function (mem) {
                mem.removeRole(spendengott);
            });
        let memberSpendengott = guild.members.find(member => member.user.username.toLowerCase().includes('vadith'));
        memberSpendengott.addRole(spendengott);
        report += `Spendengott: ${memberSpendengott.user}\n`;

        //Eifriger Padawan
        let padawan = guild.roles.find('name', 'Eifriger Padawan');
        console.log("padawan", padawan != null);
        padawan.members.forEach(
            function (mem) {
                mem.removeRole(padawan);
            });
        let memberPadawan = guild.members.find(member => member.user.username.toLowerCase().includes('vadith'));
        memberPadawan.addRole(padawan);
        report += `Eifriger Padawan: ${memberPadawan.user}\n`;

        //Staffelf�hrer
        let staffelfuehrer = guild.roles.find('name', 'Staffelfuehrer');
        console.log("staffelfuehrer", staffelfuehrer != null);
        staffelfuehrer.members.forEach(
            function (mem) {
                mem.removeRole(staffelfuehrer);
            });
        let memberStaffelfuehrer = guild.members.find(member => member.user.username.toLowerCase().includes('vadith'));
        memberStaffelfuehrer.addRole(staffelfuehrer);
        report += `Staffelfuehrer: ${memberStaffelfuehrer.user}\n`;

        //Gro�admiral
        let grossadmiral = guild.roles.find('name', 'Grossadmiral');
        console.log("grossadmiral", grossadmiral != null);
        grossadmiral.members.forEach(
            function (mem) {
                mem.removeRole(grossadmiral);
            });
        let memberGrossadmiral = guild.members.find(member => member.user.username.toLowerCase().includes('vadith'));
        memberGrossadmiral.addRole(grossadmiral);
        report += `Grossadmiral: ${memberGrossadmiral.user}\n`;

        //Gladiator
        let gladiator = guild.roles.find('name', 'Gladiator');
        console.log("Gladiator", gladiator != null);
        gladiator.members.forEach(
            function (mem) {
                mem.removeRole(gladiator);
            });
        let memberGladiator = guild.members.find(member => member.user.username.toLowerCase().includes('vadith'));
        memberGladiator.addRole(gladiator);
        report += `Gladiator: ${memberGladiator.user}\n`;


        embed.addField("Wochenreport:", report);

        client.channels.get(process.env.WEEKLY_CHANNEL_ID).send({ embed });
        
    } catch (e) {
        client.channels.get(process.env.WEEKLY_CHANNEL_ID).send(e.message);
        console.log(e.message);
    }

}