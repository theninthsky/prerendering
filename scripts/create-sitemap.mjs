import { Readable } from 'stream'
import { writeFile } from 'fs/promises'
import { SitemapStream, streamToPromise } from 'sitemap'

import pagesManifest from '../src/pages-manifest.json' assert { type: 'json' }

const generateSitemap = async () => {
  const pokemon =
    '["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise","caterpie","metapod","butterfree","weedle","kakuna","beedrill","pidgey","pidgeotto","pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew","sandslash","nidoran-f","nidorina","nidoqueen","nidoran-m","nidorino","nidoking","clefairy","clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish","gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth","persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath","abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebel","tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke","slowbro","magnemite","magneton","farfetchd","doduo","dodrio","seel","dewgong","grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler","voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan","lickitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan","horsea","seadra","goldeen","seaking","staryu","starmie","mr-mime","scyther","jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto","eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl","snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","mewtwo","mew","chikorita","bayleef","meganium","cyndaquil","quilava","typhlosion","totodile","croconaw","feraligatr","sentret","furret","hoothoot","noctowl","ledyba","ledian","spinarak","ariados","crobat","chinchou","lanturn","pichu","cleffa","igglybuff","togepi","togetic","natu","xatu","mareep","flaaffy","ampharos","bellossom","marill","azumarill","sudowoodo","politoed","hoppip","skiploom","jumpluff","aipom","sunkern","sunflora","yanma","wooper","quagsire","espeon","umbreon","murkrow","slowking","misdreavus","unown","wobbuffet","girafarig","pineco","forretress","dunsparce","gligar","steelix","snubbull","granbull","qwilfish","scizor","shuckle","heracross","sneasel","teddiursa","ursaring","slugma","magcargo","swinub","piloswine","corsola","remoraid","octillery","delibird","mantine","skarmory","houndour","houndoom","kingdra","phanpy","donphan","porygon2","stantler","smeargle","tyrogue","hitmontop","smoochum","elekid","magby","miltank","blissey","raikou","entei","suicune","larvitar","pupitar","tyranitar","lugia","ho-oh","celebi","treecko","grovyle","sceptile","torchic","combusken","blaziken","mudkip","marshtomp","swampert","poochyena","mightyena","zigzagoon","linoone","wurmple","silcoon","beautifly","cascoon","dustox","lotad","lombre","ludicolo","seedot","nuzleaf","shiftry","taillow","swellow","wingull","pelipper","ralts","kirlia","gardevoir","surskit","masquerain","shroomish","breloom","slakoth","vigoroth","slaking","nincada","ninjask","shedinja","whismur","loudred","exploud","makuhita","hariyama","azurill","nosepass","skitty","delcatty","sableye","mawile","aron","lairon","aggron","meditite","medicham","electrike","manectric","plusle","minun","volbeat","illumise","roselia","gulpin","swalot","carvanha","sharpedo","wailmer","wailord","numel","camerupt","torkoal","spoink","grumpig","spinda","trapinch","vibrava","flygon","cacnea","cacturne","swablu","altaria","zangoose","seviper","lunatone","solrock","barboach","whiscash","corphish","crawdaunt","baltoy","claydol","lileep","cradily","anorith","armaldo","feebas","milotic","castform","kecleon","shuppet","banette","duskull","dusclops","tropius","chimecho","absol","wynaut","snorunt","glalie","spheal","sealeo","walrein","clamperl","huntail","gorebyss","relicanth","luvdisc","bagon","shelgon","salamence","beldum","metang","metagross","regirock","regice","registeel","latias","latios","kyogre","groudon","rayquaza","jirachi","deoxys-normal","turtwig","grotle","torterra","chimchar","monferno","infernape","piplup","prinplup","empoleon","starly","staravia","staraptor","bidoof","bibarel","kricketot","kricketune","shinx","luxio","luxray","budew","roserade","cranidos","rampardos","shieldon","bastiodon","burmy","wormadam-plant","mothim","combee","vespiquen","pachirisu","buizel","floatzel","cherubi","cherrim","shellos","gastrodon","ambipom","drifloon","drifblim","buneary","lopunny","mismagius","honchkrow","glameow","purugly","chingling","stunky","skuntank","bronzor","bronzong","bonsly","mime-jr","happiny","chatot","spiritomb","gible","gabite","garchomp","munchlax","riolu","lucario","hippopotas","hippowdon","skorupi","drapion","croagunk","toxicroak","carnivine","finneon","lumineon","mantyke","snover","abomasnow","weavile","magnezone","lickilicky","rhyperior","tangrowth","electivire","magmortar","togekiss","yanmega","leafeon","glaceon","gliscor","mamoswine","porygon-z","gallade","probopass","dusknoir","froslass","rotom","uxie","mesprit","azelf","dialga","palkia","heatran","regigigas","giratina-altered","cresselia","phione","manaphy","darkrai","shaymin-land","arceus","victini","snivy","servine","serperior","tepig","pignite","emboar","oshawott","dewott","samurott","patrat","watchog","lillipup","herdier","stoutland","purrloin","liepard","pansage","simisage","pansear","simisear","panpour","simipour","munna","musharna","pidove","tranquill","unfezant","blitzle","zebstrika","roggenrola","boldore","gigalith","woobat","swoobat","drilbur","excadrill","audino","timburr","gurdurr","conkeldurr","tympole","palpitoad","seismitoad","throh","sawk","sewaddle","swadloon","leavanny","venipede","whirlipede","scolipede","cottonee","whimsicott","petilil","lilligant","basculin-red-striped","sandile","krokorok","krookodile","darumaka","darmanitan-standard","maractus","dwebble","crustle","scraggy","scrafty","sigilyph","yamask","cofagrigus","tirtouga","carracosta","archen","archeops","trubbish","garbodor","zorua","zoroark","minccino","cinccino","gothita","gothorita","gothitelle","solosis","duosion","reuniclus","ducklett","swanna","vanillite","vanillish","vanilluxe","deerling","sawsbuck","emolga","karrablast","escavalier","foongus","amoonguss","frillish","jellicent","alomomola","joltik","galvantula","ferroseed","ferrothorn","klink","klang","klinklang","tynamo","eelektrik","eelektross","elgyem","beheeyem","litwick","lampent","chandelure","axew","fraxure","haxorus","cubchoo","beartic","cryogonal","shelmet","accelgor","stunfisk","mienfoo","mienshao","druddigon","golett","golurk","pawniard","bisharp","bouffalant","rufflet","braviary","vullaby","mandibuzz","heatmor","durant","deino","zweilous","hydreigon","larvesta","volcarona","cobalion","terrakion","virizion","tornadus-incarnate","thundurus-incarnate","reshiram","zekrom","landorus-incarnate","kyurem","keldeo-ordinary","meloetta-aria","genesect","chespin","quilladin","chesnaught","fennekin","braixen","delphox","froakie","frogadier","greninja","bunnelby","diggersby","fletchling","fletchinder","talonflame","scatterbug","spewpa","vivillon","litleo","pyroar","flabebe","floette","florges","skiddo","gogoat","pancham","pangoro","furfrou","espurr","meowstic-male","honedge","doublade","aegislash-shield","spritzee","aromatisse","swirlix","slurpuff","inkay","malamar","binacle","barbaracle","skrelp","dragalge","clauncher","clawitzer","helioptile","heliolisk","tyrunt","tyrantrum","amaura","aurorus","sylveon","hawlucha","dedenne","carbink","goomy","sliggoo","goodra","klefki","phantump","trevenant","pumpkaboo-average","gourgeist-average","bergmite","avalugg","noibat","noivern","xerneas","yveltal","zygarde-50","diancie","hoopa","volcanion","rowlet","dartrix","decidueye","litten","torracat","incineroar","popplio","brionne","primarina","pikipek","trumbeak","toucannon","yungoos","gumshoos","grubbin","charjabug","vikavolt","crabrawler","crabominable","oricorio-baile","cutiefly","ribombee","rockruff","lycanroc-midday","wishiwashi-solo","mareanie","toxapex","mudbray","mudsdale","dewpider","araquanid","fomantis","lurantis","morelull","shiinotic","salandit","salazzle","stufful","bewear","bounsweet","steenee","tsareena","comfey","oranguru","passimian","wimpod","golisopod","sandygast","palossand","pyukumuku","type-null","silvally","minior-red-meteor","komala","turtonator","togedemaru","mimikyu-disguised","bruxish","drampa","dhelmise","jangmo-o","hakamo-o","kommo-o","tapu-koko","tapu-lele","tapu-bulu","tapu-fini","cosmog","cosmoem","solgaleo","lunala","nihilego","buzzwole","pheromosa","xurkitree","celesteela","kartana","guzzlord","necrozma","magearna","marshadow","poipole","naganadel","stakataka","blacephalon","zeraora","meltan","melmetal","grookey","thwackey","rillaboom","scorbunny","raboot","cinderace","sobble","drizzile","inteleon","skwovet","greedent","rookidee","corvisquire","corviknight","blipbug","dottler","orbeetle","nickit","thievul","gossifleur","eldegoss","wooloo","dubwool","chewtle","drednaw","yamper","boltund","rolycoly","carkol","coalossal","applin","flapple","appletun","silicobra","sandaconda","cramorant","arrokuda","barraskewda","toxel","toxtricity-amped","sizzlipede","centiskorch","clobbopus","grapploct","sinistea","polteageist","hatenna","hattrem","hatterene","impidimp","morgrem","grimmsnarl","obstagoon","perrserker","cursola","sirfetchd","mr-rime","runerigus","milcery","alcremie","falinks","pincurchin","snom","frosmoth","stonjourner","eiscue-ice","indeedee-male","morpeko-full-belly","cufant","copperajah","dracozolt","arctozolt","dracovish","arctovish","duraludon","dreepy","drakloak","dragapult","zacian","zamazenta","eternatus","kubfu","urshifu-single-strike","zarude","regieleki","regidrago","glastrier","spectrier","calyrex","wyrdeer","kleavor","ursaluna","basculegion-male","sneasler","overqwil","enamorus-incarnate","deoxys-attack","deoxys-defense","deoxys-speed","wormadam-sandy","wormadam-trash","shaymin-sky","giratina-origin","rotom-heat","rotom-wash","rotom-frost","rotom-fan","rotom-mow","castform-sunny","castform-rainy","castform-snowy","basculin-blue-striped","darmanitan-zen","meloetta-pirouette","tornadus-therian","thundurus-therian","landorus-therian","kyurem-black","kyurem-white","keldeo-resolute","meowstic-female","aegislash-blade","pumpkaboo-small","pumpkaboo-large","pumpkaboo-super","gourgeist-small","gourgeist-large","gourgeist-super","venusaur-mega","charizard-mega-x","charizard-mega-y","blastoise-mega","alakazam-mega","gengar-mega","kangaskhan-mega","pinsir-mega","gyarados-mega","aerodactyl-mega","mewtwo-mega-x","mewtwo-mega-y","ampharos-mega","scizor-mega","heracross-mega","houndoom-mega","tyranitar-mega","blaziken-mega","gardevoir-mega","mawile-mega","aggron-mega","medicham-mega","manectric-mega","banette-mega","absol-mega","garchomp-mega","lucario-mega","abomasnow-mega","floette-eternal","latias-mega","latios-mega","swampert-mega","sceptile-mega","sableye-mega","altaria-mega","gallade-mega","audino-mega","sharpedo-mega","slowbro-mega","steelix-mega","pidgeot-mega","glalie-mega","diancie-mega","metagross-mega","kyogre-primal","groudon-primal","rayquaza-mega","pikachu-rock-star","pikachu-belle","pikachu-pop-star","pikachu-phd","pikachu-libre","pikachu-cosplay","hoopa-unbound","camerupt-mega","lopunny-mega","salamence-mega","beedrill-mega","rattata-alola","raticate-alola","raticate-totem-alola","pikachu-original-cap","pikachu-hoenn-cap","pikachu-sinnoh-cap","pikachu-unova-cap","pikachu-kalos-cap","pikachu-alola-cap","raichu-alola","sandshrew-alola","sandslash-alola","vulpix-alola","ninetales-alola","diglett-alola","dugtrio-alola","meowth-alola","persian-alola","geodude-alola","graveler-alola","golem-alola","grimer-alola","muk-alola","exeggutor-alola","marowak-alola","greninja-battle-bond","greninja-ash","zygarde-10-power-construct","zygarde-50-power-construct","zygarde-complete","gumshoos-totem","vikavolt-totem","oricorio-pom-pom","oricorio-pau","oricorio-sensu","lycanroc-midnight","wishiwashi-school","lurantis-totem","salazzle-totem","minior-orange-meteor","minior-yellow-meteor","minior-green-meteor","minior-blue-meteor","minior-indigo-meteor","minior-violet-meteor","minior-red","minior-orange","minior-yellow","minior-green","minior-blue","minior-indigo","minior-violet","mimikyu-busted","mimikyu-totem-disguised","mimikyu-totem-busted","kommo-o-totem","magearna-original","pikachu-partner-cap","marowak-totem","ribombee-totem","rockruff-own-tempo","lycanroc-dusk","araquanid-totem","togedemaru-totem","necrozma-dusk","necrozma-dawn","necrozma-ultra","pikachu-starter","eevee-starter","pikachu-world-cap","meowth-galar","ponyta-galar","rapidash-galar","slowpoke-galar","slowbro-galar","farfetchd-galar","weezing-galar","mr-mime-galar","articuno-galar","zapdos-galar","moltres-galar","slowking-galar","corsola-galar","zigzagoon-galar","linoone-galar","darumaka-galar","darmanitan-galar-standard","darmanitan-galar-zen","yamask-galar","stunfisk-galar","zygarde-10","cramorant-gulping","cramorant-gorging","toxtricity-low-key","eiscue-noice","indeedee-female","morpeko-hangry","zacian-crowned","zamazenta-crowned","eternatus-eternamax","urshifu-rapid-strike","zarude-dada","calyrex-ice","calyrex-shadow","venusaur-gmax","charizard-gmax","blastoise-gmax","butterfree-gmax","pikachu-gmax","meowth-gmax","machamp-gmax","gengar-gmax","kingler-gmax","lapras-gmax","eevee-gmax","snorlax-gmax","garbodor-gmax","melmetal-gmax","rillaboom-gmax","cinderace-gmax","inteleon-gmax","corviknight-gmax","orbeetle-gmax","drednaw-gmax","coalossal-gmax","flapple-gmax","appletun-gmax","sandaconda-gmax","toxtricity-amped-gmax","centiskorch-gmax","hatterene-gmax","grimmsnarl-gmax","alcremie-gmax","copperajah-gmax","duraludon-gmax","urshifu-single-strike-gmax","urshifu-rapid-strike-gmax","toxtricity-low-key-gmax","growlithe-hisui","arcanine-hisui","voltorb-hisui","electrode-hisui","typhlosion-hisui","qwilfish-hisui","sneasel-hisui","samurott-hisui","lilligant-hisui","zorua-hisui","zoroark-hisui","braviary-hisui","sliggoo-hisui","goodra-hisui","avalugg-hisui","decidueye-hisui","dialga-origin","palkia-origin","basculin-white-striped","basculegion-female","enamorus-therian"]'

  const dynamicMaps = {
    '/pokemon/:': JSON.parse(pokemon)
  }

  const staticPaths = pagesManifest.filter(({ path }) => !path.includes(':')).map(({ path }) => path)
  const dynamicPaths = Object.keys(dynamicMaps).reduce(
    (acc, path) => [...acc, ...dynamicMaps[path].map(value => path.replace(':', value))],
    []
  )
  const paths = [...staticPaths, ...dynamicPaths]

  const stream = new SitemapStream({ hostname: 'https://client-side-rendering.pages.dev' })
  const links = paths.map(path => ({ url: path, changefreq: 'daily' }))

  streamToPromise(Readable.from(links).pipe(stream))
    .then(data => data.toString())
    .then(res => writeFile('public/sitemap.xml', res))
    .then(() => console.log('Sitemap created.'))
    .catch(console.log)
}

generateSitemap()
