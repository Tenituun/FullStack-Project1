import express from "express";
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(express.static('public', {root: '.' }));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile('./public/index.html', {root: '.' });
});

app.get('/guestbook.html', (req, res) => {
    res.sendFile('./public/guestbook.html', {root: '.' });
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/newmessage.html', (req, res) => {
    res.sendFile('./public/newmessage.html', {root: '.' }); 
});

app.post('/newmessage.html', (req, res) => {
    fs.readFile('./public/data/messagedata.JSON', 'utf-8', (err, contents) => {
        if(err){
            res.send("Tiedostoa ei löydy.");
            return;
        }
        let data = JSON.parse(contents || "[]");
        // let nameData = req.body.name;
        // let countryData = req.body.country;
        // let messageData = req.body.message;
        // console.log(req.body);
        // data.push(
        //     {'name': nameData, 'country': countryData, 'message': messageData }
        // );
        data.push(req.body);
        let jsonData = JSON.stringify(data);
    
        fs.writeFile("./public/data/messagedata.JSON", jsonData, (err) => {
            if(err){
                res.send("Tiedostoa ei voitu kirjoittaa.");
                return;
            }
            console.log("Tiedot tallennettu!");
        });
        res.send("Data saved to the file!")
    });
});

app.get('/ajaxmessage.html', (req, res) => {
    res.sendFile('./public/ajaxmessage.html', {root: '.' });
});

app.post('/ajaxmessage.html', (req, res) => {
    console.log(req.body);
    fs.readFile('./public/data/messagedata.JSON', 'utf-8', (err, contents) => {
        if(err){
            res.send("Tiedostoa ei löydy.");
            return;
        }
        let data = JSON.parse(contents || "[]");
        data.push(req.body);
        let jsonData = JSON.stringify(data);
    
        fs.writeFile("./public/data/messagedata.JSON", jsonData, (err) => {
            if(err){
                res.send("Tiedostoa ei voitu kirjoittaa.");
                return;
            }
            res.send(jsonData);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

