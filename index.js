const dotenv = require("dotenv");
const nodeFetch = require('node-fetch');
const fs = require('fs');
const { Client, GatewayIntentBits, time } = require("discord.js");
const QuickChart = require('quickchart-js');
const { reverse } = require('dns');
dotenv.config({path:'./.env'});
const API_KEY = process.env.API_KEY;
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

const readMe = fs.readFileSync('Stock_names.txt', 'utf-8');
const readFileLines = filename =>
  fs
    .readFileSync('Stock_names.txt')
    .toString('UTF8')
    .split('\n');
let afs = readFileLines('Stock_names.txt');
let lenafs = afs.length;

client.on('messageCreate',async (message) => {
    var low = message.content.toLowerCase();
    if(message.author.bot) return;
    var p =  low.split(" ");
    var x = p.length;
    let tf=0;
    if(x==2 && p[1]!='hello');
    {
        const abc = p[1].toUpperCase();
        for(let e = 0;e<lenafs;e++)
        {
            const def = afs[e];
            if(abc+'\r' === def) 
            {
                tf = 1;
                break;        
            }
        }
    }

    if(p[0]=='<@1134461239729324214>')
    {
        if(tf==0 && x==2 && p[1]!='hello')
        {
            message.reply({
                content:`This stock is not present in NYSE please write it again.`,
            });
            return;
        }
        for(var i=1;i<x;i++)
        {
            if(p[1]=='hello' || p[1]=='hi')
            {
                message.reply({
                    content: 'Hello' + " " + message.author.username +  ' I am StockBot ' + '\nEnter stock name(NYSE) for its details' + '\nYou can also get top gainers & losers ',
                });
                break;
            }
            var f=0;
            for(var j=1;j<x;j++)
            {
                if(p[j]=="top" && (p[j+1]=="gainers"))
                {
                    var topG = new Array();
                    try{
                        const response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
                        const data7 = await response.json();
                        var len = data7.top_gainers.length;
                        for(var k=0;k<len;k++)
                        {
                            topG[k] = data7.top_gainers[k].ticker + " ";
                        }
                    }
                    catch(error){
                        console.log(error);
                        message.reply({
                            content:'Sorry for inconvenience, We have some error from our side so please try later !!'
                        });
                        return;
                    }
                    message.reply({
                        content:`Here is the list of top gainers(NYSE) :- ${topG}`,
                    });
                    f=1;
                    break;
                }
                if(p[j]=="top" && (p[j+1]=="losers"))
                {
                    var topL = new Array();
                    try{
                        const response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
                        const data7 = await response.json();
                        var len1 = data7.top_losers.length;
                        for(var k=0;k<len1;k++)
                        {
                            topL[k] = data7.top_losers[k].ticker + " ";
                        }
                    }
                    catch(error){
                        console.log(error);
                        message.reply({
                            content:'Sorry for inconvenience, We have some error from our side so please try later !!'
                        });
                        return;
                    }
                    message.reply({
                        content:`Here is the list of top losers(NYSE) :- ${topL}`,
                    });
                    f=1;
                    break;
                }
            }
            if(f) break;
            if(tf==1)
            {
                var day,week,month,year,year5,price,price1,price2,price3,price4,price5,dd,mm,yy;
                const name = p[1].toUpperCase();
                var we1,we2;
                var link1 = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${name}&apikey=${API_KEY}`;
                var x_lable = new Array();
                var y_lable = new Array();
                var maxl,minl;
                try {
                    const response = await fetch(link1);
                    const data1 = await response.json();
                    var st;
                    for(let key1 in data1['Weekly Time Series']) 
                    {
                        st = key1;
                        break;
                    }
                    var stt = st.split('-');
                    yy = stt[0];
                    mm = stt[1];
                    dd = stt[2];
                    we1 = data1['Weekly Time Series'][`${yy}-${mm}-${dd}`]['1. open'];
                    we2 = data1['Weekly Time Series'][`${yy}-${mm}-${dd}`]['4. close'];
                    
                    for(let key1 in data1['Weekly Time Series']) 
                    {
                        if(i==50) {break;}
                        for(let key2 in data1['Weekly Time Series'][key1])
                        {
                            if(key2=='4. close')
                            {
                                x_lable.push(data1['Weekly Time Series'][key1][key2]);
                            }
                        }  
                        y_lable.push(key1);  
                        i++;
                    } 
                    x_lable.reverse();
                    y_lable.reverse();
                    maxl = Math.max(...x_lable);
                    minl = Math.min(...x_lable);
                } catch (error) {
                    console.log(error);
                    message.reply({
                        content:'Sorry for inconvenience, We have some error from our side so please try later !!'
                    });
                    return;
                }
                week = (((we2 - we1)/we1)*100).toFixed(2);
                price2 = we1 + ' $';
                if(week < 0) {week = 'dropped by '+ week + '% ↓';}
                else {week = 'increased by ' + week + '% ↑';}
                var ye = new Array();
                var ye1,ye2;
                var link2 = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${name}&apikey=${API_KEY}`;
                try {
                    const response1 = await fetch(link2);
                    const data2 = await response1.json();  
                    var st;
                    for(let key1 in data2['Monthly Time Series']) 
                    {
                        st = key1;
                        break;
                    }
                    var stt = st.split('-');
                    yy = stt[0];
                    mm = stt[1];
                    dd = stt[2];
                    var mon1,mon2;
                    mon1 = data2['Monthly Time Series'][`${yy}-${mm}-${dd}`]['1. open'];
                    mon2 =  data2['Monthly Time Series'][`${yy}-${mm}-${dd}`]['4. close'];
                    i=0;
                    for(let key1 in data2['Monthly Time Series']) 
                    {
                        if(i==12) {break;}
                        for(let key2 in data2['Monthly Time Series'][key1])
                        {
                            if(key2=='4. close')
                            {
                                ye.push(data2['Monthly Time Series'][key1][key2]);
                            }
                        }    
                        i++;
                    } 
                    ye1 = data2['Monthly Time Series'][`${yy}-${mm}-${dd}`]['4. close'];
                    ye2 = data2['Monthly Time Series'][`${yy-5}-${12}-${31}`]['4. close'];
                    i=0;
                    
                } catch (error) {
                    console.log(error);
                    message.reply({
                        content:'Sorry for inconvenience, We have some error from our side so please try later !!'
                    });
                    return;
                }
                month = (((mon2 - mon1)/mon1)*100).toFixed(2);
                if(month < 0) {month = 'dropped by ' + month + '% ↓';}
                else {month = 'increased by ' + month + '% ↑';}            
                year = (((ye[0] - ye[11])/ye[11])*100).toFixed(2);
                price3 = mon1 + ' $';
                price4 = ye[11] + ' $';
                if(year < 0) {year = 'dropped by ' + year + '% ↓';}
                else {year = 'increased by ' + year + '% ↑';}
                year5 = (((ye1 - ye2)/ye2)*100).toFixed(2);
                if(year5 < 0) {year5 ='dropped by '+ year5 + '% ↓'}
                else {year5 = 'increased by ' +  year5 + '% ↑';}
                price5 = ye2 + ' $';
                var link3 = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${name}&apikey=${API_KEY}`;
                var x_lable1 = new Array();
                var y_lable1 = new Array();
                var x_lable2 = new Array();
                var y_lable2 = new Array();
                var x_lable3 = new Array();
                var y_lable3 = new Array();
                var maxl1,minl1,maxl2,minl2,maxl3,minl3;
                try {
                    const response3 = await fetch(link3);
                    const data3 = await response3.json();
                    var st;
                    for(let key1 in data3['Time Series (Daily)']) 
                    {
                        st = key1;
                        break;
                    }
                    var stt = st.split('-');
                    yy = stt[0];
                    mm = stt[1];
                    dd = stt[2];
                    var x1,y;
                    x1 = data3['Time Series (Daily)'][`${yy}-${mm}-${dd}`]['1. open'];
                    y = data3['Time Series (Daily)'][`${yy}-${mm}-${dd}`]['4. close'];  
                    price = data3['Time Series (Daily)'][`${yy}-${mm}-${dd}`]['4. close'];
                    var i=0;
                    for(let key in data3['Time Series (Daily)'])
                    {
                        if(i==7) {break;}
                        for(let key1 in data3['Time Series (Daily)'][key])
                        {
                            if(key1=='4. close')
                            {
                                x_lable1.push(data3['Time Series (Daily)'][key][key1]);
                            }
                        }
                        y_lable1.push(key);
                        i++;
                    }
                    x_lable1.reverse();
                    y_lable1.reverse();
                    maxl1 = Math.max(...x_lable1);
                    minl1 = Math.min(...x_lable1);
                    i=0;
                    for(let key in data3['Time Series (Daily)'])
                    {
                        if(i==30) {break;}
                        for(let key1 in data3['Time Series (Daily)'][key])
                        {
                            if(key1=='4. close')
                            {
                                x_lable2.push(data3['Time Series (Daily)'][key][key1]);
                            }
                        }
                        y_lable2.push(key);
                        i++;
                    }
                    x_lable2.reverse();
                    y_lable2.reverse();
                    maxl2 = Math.max(...x_lable2);
                    minl2 = Math.min(...x_lable2);
                    i=0;
                    for(let key in data3['Time Series (Daily)'])
                    {
                        if(i==180) {break;}
                        for(let key1 in data3['Time Series (Daily)'][key])
                        {
                            if(key1=='4. close')
                            {
                                x_lable3.push(data3['Time Series (Daily)'][key][key1]);
                            }
                        }
                        y_lable3.push(key);
                        i++;
                    }
                    x_lable3.reverse();
                    y_lable3.reverse();
                    maxl3= Math.max(...x_lable3);
                    minl3 = Math.min(...x_lable3);
                } catch (error) {
                    console.log(error);
                    message.reply({
                        content:'Sorry for inconvenience, We have some error from our side so please try later !!'
                    });
                    return;
                }
                price1 = x1+' $';
                day = (((y-x1)/x1)*100).toFixed(2);
                if(day < 0) {day = 'dropped by ' + day + '% ↓';}
                else {day = 'increased by ' + day + '% ↑';}
                price = price + ' $';
                const chart1 = new QuickChart();
                chart1.setConfig({
                    type: 'line',
                    data: {
                        datasets: [{
                            label:'seven days',
                            data: x_lable1
                        }],
                        labels: y_lable1
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    min: minl1-10,
                                    max: maxl1 + 10,
                                    stepSize: 1,
                                },
                            }]
                        }
                    }
                });
                const url7 = await chart1.getShortUrl();
                const chart2 = new QuickChart();
                chart2.setConfig({
                    type: 'line',
                    data: {
                        datasets: [{
                            label:'one month',
                            data: x_lable2
                        }],
                        labels: y_lable2
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    min: minl2-10,
                                    max: maxl2 + 10,
                                    stepSize: 1,
                                },
                            }]
                        }
                    }
                });
                const url30 = await chart2.getShortUrl();
                const chart3 = new QuickChart();
                chart3.setConfig({
                    type: 'line',
                    data: {
                        datasets: [{
                            label:'one year',
                            data: x_lable
                        }],
                        labels: y_lable
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    min: minl-10,
                                    max: maxl + 10,
                                    stepSize: 1,
                                },
                            }]
                        }
                    }
                });
                const url1 = await chart3.getShortUrl();
                const chart4 = new QuickChart();
                chart4.setConfig({
                    type: 'line',
                    data: {
                        datasets: [{
                            label:'six month',
                            data: x_lable3
                        }],
                        labels: y_lable3
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    min: minl3-10,
                                    max: maxl3 + 10,
                                    stepSize: 1,
                                },
                            }]
                        }
                    }
                });
                const url6 = await chart4.getShortUrl();
                message.reply({
                    content:`Yesterday's price of ${name} is ${price}\nYesterday the stock ${day} from price ${price1}\nIn last seven day the stock ${week} from ${price2}\nIn last month the stock ${month} from ${price3}\nIn last year the stock ${year} from ${price4}\nIn last five year the stock ${year5} from ${price5}\nLast seven days performance ${url7}\nLast 30 days performance ${url30}\nLast six month's performance ${url6}\nLast one year's performance ${url1}`,
                });
                break;
            }   
            else 
            {
                message.reply({
                    content: "Sorry I am not capable to understand this !!.\nEnter a stock name(NYSE) for details\nYou can get top gainers & losers.",
                });
                break;
            }
        } 
    }
});

const cid = process.env.CLIENT_ID;

client.login(
    cid
);