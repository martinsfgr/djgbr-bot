const Twit = require('twit');
require('dotenv').config();

const randomItem = require('random-item');

const Bot = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
});

console.log('Bot tá rodando!');

let phrases = [
  'єiτα, єн σ ∂נ gвr ',
  '€เ†Д, €Ћ Ø Ðﮊ ģβЯ ',
  '૯¡Ƭα, ૯ђ ѳ ∂j gв૨ ',
  'Ξitд, Ξh Ø dﻝ gbЯ ',
  'єiTA, єђ ø ₫j gþя ',
  'эเ†ล, эђ ๏ ∂נ φвя ',
  'ⒺⒾⓉⒶ, ⒺⒽ Ⓞ ⒹⒿ ⒼⒷⓇ ',
  '€ƗŦΔ, €Ħ Ø ĐĴ ǤβŘ ',
  'ē¡ƭā, ēƕ Ѳ Đĵ ǤƁƦ ',
  'ε¡тą, εн ഠ ʠj φЪя ',
  'eiイą, eん Ծ ʠj gЪя ',
  'єıтα, єн σ ∂j gвя ',
  'ɛɪ†ą, ɛʜ ѳ ɗʝ ɢʙʀ ',
  'ᕮƗƬᗩ, ᕮᕼ 〇 Ðᒎ Ǥᙖᖇ ',
  'EITɑ, EH O DJ GBR ',
  'E̶I̶T̶A̶,̶ ̶E̶H̶ ̶O̶ ̶D̶J̶ ̶G̶B̶R̶ ',
  '[є̲̅i̲̅т̲̅α̲̅,̲̅ ̲̅є̲̅н̲̅ ̲̅σ̲̅ ̲̅d̲̅j̲̅ ̲̅g̲̅b̲̅я̲̅] ',
  'モ工匕丹, モ卄 口 刀Ｊ ム乃尺 ',
  'ᴇɪᴛᴀ, ᴇʜ ᴏ ᴅᴊ ɢʙʀ ',
  '🇪 🇮 🇹 🇦 , 🇪 🇭  🇴  🇩 🇯  🇬 🇧 🇷 ',
  '🄴🄸🅃🄰, 🄴🄷 🄾 🄳🄹 🄶🄱🅁 ',
  '🅔🅘🅣🅐, 🅔🅗 🅞 🅓🅙 🅖🅑🅡 ',
  '🅴🅸🆃🅰, 🅴🅷 🅾 🅳🅹 🅶🅱🆁 ',
  '𝔈ℑ𝔗𝔄, 𝔈ℌ 𝔒 𝔇𝔍 𝔊𝔅ℜ ',
  '𝕰𝕴𝕿𝕬, 𝕰𝕳 𝕺 𝕯𝕵 𝕲𝕭𝕽 ',
  '𝐸𝐼𝒯𝒜, 𝐸𝐻 𝒪 𝒟𝒥 𝒢𝐵𝑅 ',
  '𝓔𝓘𝓣𝓐, 𝓔𝓗 𝓞 𝓓𝓙 𝓖𝓑𝓡 ',
  '𝔼𝕀𝕋𝔸, 𝔼ℍ 𝕆 𝔻𝕁 𝔾𝔹ℝ ',
  '𝙴𝙸𝚃𝙰, 𝙴𝙷 𝙾 𝙳𝙹 𝙶𝙱𝚁 ',
  '𝘌𝘐𝘛𝘈, 𝘌𝘏 𝘖 𝘋𝘑 𝘎𝘉𝘙 ',
  '𝙀𝙄𝙏𝘼, 𝙀𝙃 𝙊 𝘿𝙅 𝙂𝘽𝙍 ',
  '𝐸𝐼𝑇𝐴, 𝐸𝐻 𝑂 𝐷𝐽 𝐺𝐵𝑅 ',
  '𝑬𝑰𝑻𝑨, 𝑬𝑯 𝑶 𝑫𝑱 𝑮𝑩𝑹 ',
  '𝐄𝐈𝐓𝐀, 𝐄𝐇 𝐎 𝐃𝐉 𝐆𝐁𝐑 ',
  '𝗘𝗜𝗧𝗔, 𝗘𝗛 𝗢 𝗗𝗝 𝗚𝗕𝗥 ',
]

function tweet() {
  Bot.get('statuses/home_timeline', {
    screen_name: 'djgbr_bot'
  }, function (err, data, response) {
    let phrase = randomItem(phrases);
    let phraseNormalized = phrase.concat(`#gbr${data[0].user.statuses_count}`);
    console.log(`O bot postou essa frase: ${phraseNormalized}`);

    Bot.post('statuses/update', {
      status: phraseNormalized
    });
  });
}

function retweet() {
  let query = {
    q: "dj gbr",
    result_type: "recent",
    language: "pt"
  }

  Bot.get('search/tweets', query, function (err, data, response) {
    if (err) {
      console.log(`O bot não conseguiu achar o último tweet. ${err}`);
    } 

    else {
      let id = {
        id: data.statuses[0].id_str
      }
      
      if (data.statuses[0].user.screen_name != 'djgbr_bot') {
        // Fazer o Retweet
        Bot.post('statuses/retweet/:id', id, function (err, data, response) {
          if (err) {
            console.log(`O bot não conseguiu retweetar. ${err}`);
          } else {
            console.log(`O bot retweetou: ${data.text}`);
          }
        });
        
        // Fazer a Reply
        let tweet = data.statuses[0].text;

        if (tweet.split(' ')[0] != 'RT') {
          let phrase = randomItem(phrases);
          
          let res = {
            status: '@' + data.statuses[0].user.screen_name + ' ' + phrase,
            in_reply_to_status_id: data.statuses[0].id_str
          }
          
          Bot.post('statuses/update', res, function (err, data, response) {
            if (err) {
              console.log(`O bot não conseguiu dar reply. ${err}`);
            } else {
              console.log(`O bot deu reply: ${data.text}`);
            }
          });
        } else {
          console.log('O bot tá tentando dar reply num retweet');
        }
      } else {
        console.log('O bot tá tentando se comunicar com ele próprio');
      }
    }
  });
}

setInterval(tweet, 180*60*1000);
setInterval(retweet, 1*20*1000);
