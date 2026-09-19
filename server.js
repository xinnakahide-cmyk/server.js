const express = require('express');
const fetch = require('node-fetch'); // Kung Node v18+, pwedeng alisin at gamitin ang built-in fetch
const app = express();

app.use(express.json());

// Ilagay dito ang iyong Discord Webhook URL (ang original na link mula sa Discord)
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1550735146599190543/VGzmrAx3DF4ybcpWeqTmH3BD_bFS4Ayanzok9vF7K3Kt04JLSQAcWlxQBM83rkyEqwNg";

app.post('/proxy/*', async (req, res) => {
    try {
        const clientData = req.body;

        // Kunin ang iba't ibang impormasyon na ipinadala galing sa Roblox script
        const playerName = clientData.playerName || "Unknown";
        const displayName = clientData.displayName || "Unknown";
        const userId = clientData.userId || "0";
        const accountAge = clientData.accountAge || 0;
        const membershipType = clientData.membershipType || "None";
        const placeId = clientData.placeId || "0";
        const gameName = clientData.gameName || "Unknown Game";
        const executor = clientData.executor || "Unknown Executor";
        const gameUrl = `https://www.roblox.com/games/${placeId}`;
        const profileUrl = `https://www.roblox.com/users/${userId}/profile`;
        const thumbUrl = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`;

        // Gumawa ng magandang Discord Embed message na naglalaman ng lahat ng detalye
        const discordPayload = {
            username: "Zenith Logger",
            avatar_url: "https://i.imgur.com/4M34hi2.png",
            embeds: [
                {
                    title: "Zenith Menu v2",
                    color: 9807275, // Kulay Lila (Purple)
                    thumbnail: {
                        url: thumbUrl
                    },
                    fields: [
                        { name: "Display Name", value: displayName, inline: true },
                        { name: "Username", value: `@${playerName}`, inline: true },
                        { name: "User ID", value: tostringSafe(userId), inline: true },
                        { name: "Account Age", value: `${accountAge} araw`, inline: true },
                        { name: "Membership", value: membershipType, inline: true },
                        { name: "Executor", value: executor, inline: true },
                        { name: "Game Name", value: `${gameName}\n\`ID: ${placeId}\``, inline: false },
                        { name: "Game Link", value: `[Profile](${profileUrl}) | [Laro](${gameUrl})`, inline: false }
                    ],
                    footer: {
                        text: "Zenith Logging System • Developed by s1rcxlotus",
                        icon_url: thumbUrl
                    },
                    timestamp: new Date().toISOString()
                }
            ]
        };

        // I-forward ang data papunta sa Discord Webhook
        const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (discordResponse.ok) {
            res.status(200).json({ success: true, message: "Logged and sent to Discord successfully!" });
        } else {
            const errText = await discordResponse.text();
            res.status(discordResponse.status).json({ success: false, error: errText });
        }

    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

function tostringSafe(val) {
    return val ? val.toString() : "N/A";
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server is running on port ${PORT}`)); 