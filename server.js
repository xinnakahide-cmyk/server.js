const http = require('http');

// Ang webhook URL na ibinigay mo
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1550735146599190543/VGzmrAx3DF4ybcpWeqTmH3BD_bFS4Ayanzok9vF7K3Kt04JLSQAcWlxQBM83rkyEqwNg";

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url.startsWith('/proxy')) {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const clientData = JSON.parse(body);

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

                const discordPayload = {
                    username: "Zenith Logger",
                    avatar_url: "https://i.imgur.com/4M34hi2.png",
                    embeds: [
                        {
                            title: "New Script Execution Found",
                            color: 9807275,
                            thumbnail: { url: thumbUrl },
                            fields: [
                                { name: "Display Name", value: displayName, inline: true },
                                { name: "Username", value: `@${playerName}`, inline: true },
                                { name: "User ID", value: String(userId), inline: true },
                                { name: "Account Age", value: `${accountAge} araw`, inline: true },
                                { name: "Membership", value: membershipType, inline: true },
                                { name: "Executor", value: executor, inline: true },
                                { name: "Game Name", value: `${gameName}\n[ID: ${placeId}]`, inline: false },
                                { name: "Links", value: `[Profile](${profileUrl}) | [Game](${gameUrl})`, inline: false }
                            ],
                            footer: {
                                text: "Zenith Logging System • Developed by s1rcxlotus",
                                icon_url: thumbUrl
                            },
                            timestamp: new Date().toISOString()
                        }
                    ]
                };

                const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(discordPayload)
                });

                if (discordResponse.ok) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, message: "Sent to Discord!" }));
                } else {
                    const errText = await discordResponse.text();
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: errText }));
                }

            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Not Found");
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));                    },
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
