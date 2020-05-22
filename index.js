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
  '🇪 🇮 🇹 🇦 , 🇪  🇴  🇩 🇯  🇬 🇧 🇷 ',
  '𝙴𝚂𝚂𝙴 𝙴𝙷 𝙾 𝙶𝙱𝚁, 𝙴𝙻𝙴 𝙼𝙴𝚁𝙼𝙾, 𝙾 𝙲𝙰𝚁𝙰 𝙳𝙰𝚂 𝚁𝙰𝚅𝙴. 𝙿𝙴𝙶𝙰 𝙴𝚂𝚂𝙰, 𝚃𝙰? ',
  '777 𝑁𝐴 𝐹𝑅𝐸𝑁𝑇𝐸 𝐷𝑂 𝑀𝐸𝐺𝐴𝑇𝑅𝑂𝑁 ',
  '𝓔𝓗 𝓞 𝓓𝓙 𝓖𝓑𝓡 ',
  'ⅤᗩƗ ᑕ〇ᗰᕮᑕᗩᖇ 〇 Ⅴᖇᗩᑌ ',
  'ђj є Sєxø ∩A яA√є ',
  'ø þяAþø Tєм ∩øмє: D̶J̶ ̶G̶B̶R̶  ',
]

function postPhrase() {
  Bot.get('statuses/home_timeline', {
    screen_name: 'djgbr_bot'
  }, function (err, data, response) {
    let phrase = randomItem(phrases);
    let phraseNormalized = phrase.concat(`#gbr0${data[0].user.statuses_count}`);
    console.log(`O bot postou essa frase: ${phraseNormalized}`);

    Bot.post('statuses/update', {
      status: phraseNormalized
    });
  });
}

function retweetGbr() {
  let query = {
    q: "dj gbr",
    result_type: "recent",
    language: "pt"
  }

  Bot.get('search/tweets', query, function (err, data, response) {
    if (err) {
      console.log(`O bot não conseguiu achar o último tweet. ${err}`);
    } else {
      let id = {
        id: data.statuses[0].id_str
      }

      Bot.post('statuses/retweet/:id', id, function (err, data, response) {
        if (err) {
          console.log(`O bot não conseguiu retweetar. ${err}`);
        } else {
          console.log(`O bot retweetou: ${id.id}`);
        }
      });
    }
  });
}

setInterval(postPhrase, 60*60*1000);
setInterval(retweetGbr, 5*60*1000);
