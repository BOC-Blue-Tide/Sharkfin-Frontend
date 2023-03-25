const Axios = require('axios');
const schedule = require('node-schedule');
// require("dotenv").config();


module.exports = {
  getGlobalBoard: async (req, res) => {
    // await axios.get(`http://localhost:8080/globalleaderboard`)
    // .then((result) => {
    //   res.status(200).send(result.data)
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    var dummyData = [{"id":1,"first_name":"Fanchon","profilepic_url":"http://dummyimage.com/112x132.png/dddddd/000000","performance_percentage":-38.5},
    {"id":2,"first_name":"Demetre","profilepic_url":"http://dummyimage.com/159x165.png/5fa2dd/ffffff","performance_percentage":-47.8},
    {"id":3,"first_name":"Lorain","profilepic_url":"http://dummyimage.com/109x136.png/dddddd/000000","performance_percentage":-17.7},
    {"id":4,"first_name":"Sawyere","profilepic_url":"http://dummyimage.com/184x133.png/dddddd/000000","performance_percentage":-32.3},
    {"id":5,"first_name":"Hogan","profilepic_url":"http://dummyimage.com/198x128.png/dddddd/000000","performance_percentage":-24.9},
    {"id":6,"first_name":"Tildi","profilepic_url":"http://dummyimage.com/174x164.png/cc0000/ffffff","performance_percentage":-1.5},
    {"id":7,"first_name":"Arlen","profilepic_url":"http://dummyimage.com/181x171.png/dddddd/000000","performance_percentage":-45.2},
    {"id":8,"first_name":"Zita","profilepic_url":"http://dummyimage.com/193x120.png/ff4444/ffffff","performance_percentage":16.4},
    {"id":9,"first_name":"Somerset","profilepic_url":"http://dummyimage.com/176x194.png/5fa2dd/ffffff","performance_percentage":-20.0},
    {"id":10,"first_name":"Adams","profilepic_url":"http://dummyimage.com/177x119.png/dddddd/000000","performance_percentage":26.1},
    {"id":11,"first_name":"Crystal","profilepic_url":"http://dummyimage.com/179x197.png/cc0000/ffffff","performance_percentage":23.4},
    {"id":12,"first_name":"Winifield","profilepic_url":"http://dummyimage.com/167x157.png/dddddd/000000","performance_percentage":-37.4},
    {"id":13,"first_name":"Jeffrey","profilepic_url":"http://dummyimage.com/152x184.png/ff4444/ffffff","performance_percentage":-46.8},
    {"id":14,"first_name":"Tobi","profilepic_url":"http://dummyimage.com/196x140.png/cc0000/ffffff","performance_percentage":26.7},
    {"id":15,"first_name":"Carson","profilepic_url":"http://dummyimage.com/134x131.png/cc0000/ffffff","performance_percentage":5.1},
    {"id":16,"first_name":"Gibby","profilepic_url":"http://dummyimage.com/149x180.png/ff4444/ffffff","performance_percentage":-1.4},
    {"id":17,"first_name":"Alexandre","profilepic_url":"http://dummyimage.com/198x166.png/5fa2dd/ffffff","performance_percentage":27.4},
    {"id":18,"first_name":"Dori","profilepic_url":"http://dummyimage.com/156x124.png/cc0000/ffffff","performance_percentage":1.1},
    {"id":19,"first_name":"Corene","profilepic_url":"http://dummyimage.com/112x173.png/dddddd/000000","performance_percentage":-38.1},
    {"id":20,"first_name":"Collette","profilepic_url":"http://dummyimage.com/140x200.png/dddddd/000000","performance_percentage":-35.6},
    {"id":21,"first_name":"Fredericka","profilepic_url":"http://dummyimage.com/165x147.png/5fa2dd/ffffff","performance_percentage":-17.2},
    {"id":22,"first_name":"Jacquenette","profilepic_url":"http://dummyimage.com/110x193.png/cc0000/ffffff","performance_percentage":-28.3},
    {"id":23,"first_name":"Tessy","profilepic_url":"http://dummyimage.com/157x135.png/dddddd/000000","performance_percentage":-37.4},
    {"id":24,"first_name":"Arleyne","profilepic_url":"http://dummyimage.com/139x137.png/dddddd/000000","performance_percentage":29.6},
    {"id":25,"first_name":"Ephrem","profilepic_url":"http://dummyimage.com/157x188.png/5fa2dd/ffffff","performance_percentage":18.7},
    {"id":26,"first_name":"Midge","profilepic_url":"http://dummyimage.com/167x181.png/dddddd/000000","performance_percentage":-22.6},
    {"id":27,"first_name":"Leeland","profilepic_url":"http://dummyimage.com/173x129.png/ff4444/ffffff","performance_percentage":0.5},
    {"id":28,"first_name":"Kathleen","profilepic_url":"http://dummyimage.com/118x155.png/dddddd/000000","performance_percentage":22.1},
    {"id":29,"first_name":"Halette","profilepic_url":"http://dummyimage.com/200x161.png/5fa2dd/ffffff","performance_percentage":-39.0},
    {"id":30,"first_name":"Creighton","profilepic_url":"http://dummyimage.com/196x184.png/ff4444/ffffff","performance_percentage":8.8},
    {"id":31,"first_name":"Peadar","profilepic_url":"http://dummyimage.com/176x184.png/dddddd/000000","performance_percentage":18.5},
    {"id":32,"first_name":"Raven","profilepic_url":"http://dummyimage.com/118x153.png/cc0000/ffffff","performance_percentage":-40.8},
    {"id":33,"first_name":"Carol","profilepic_url":"http://dummyimage.com/157x174.png/ff4444/ffffff","performance_percentage":25.2},
    {"id":34,"first_name":"Wilhelmina","profilepic_url":"http://dummyimage.com/190x125.png/dddddd/000000","performance_percentage":5.1},
    {"id":35,"first_name":"Jarrid","profilepic_url":"http://dummyimage.com/160x130.png/cc0000/ffffff","performance_percentage":-43.2},
    {"id":36,"first_name":"Oliviero","profilepic_url":"http://dummyimage.com/157x105.png/dddddd/000000","performance_percentage":-5.9},
    {"id":37,"first_name":"Cherin","profilepic_url":"http://dummyimage.com/131x161.png/dddddd/000000","performance_percentage":-28.0},
    {"id":38,"first_name":"Rickard","profilepic_url":"http://dummyimage.com/197x195.png/cc0000/ffffff","performance_percentage":-18.9},
    {"id":39,"first_name":"Burke","profilepic_url":"http://dummyimage.com/186x180.png/ff4444/ffffff","performance_percentage":-35.2},
    {"id":40,"first_name":"Thaxter","profilepic_url":"http://dummyimage.com/179x124.png/ff4444/ffffff","performance_percentage":23.8},
    {"id":41,"first_name":"Faustine","profilepic_url":"http://dummyimage.com/194x194.png/ff4444/ffffff","performance_percentage":4.0},
    {"id":42,"first_name":"Calhoun","profilepic_url":"http://dummyimage.com/103x187.png/dddddd/000000","performance_percentage":-22.5},
    {"id":43,"first_name":"Leslie","profilepic_url":"http://dummyimage.com/150x157.png/cc0000/ffffff","performance_percentage":18.7},
    {"id":44,"first_name":"Lorilee","profilepic_url":"http://dummyimage.com/111x150.png/dddddd/000000","performance_percentage":-15.4},
    {"id":45,"first_name":"Terri-jo","profilepic_url":"http://dummyimage.com/186x123.png/5fa2dd/ffffff","performance_percentage":22.1},
    {"id":46,"first_name":"Quinn","profilepic_url":"http://dummyimage.com/177x131.png/dddddd/000000","performance_percentage":-10.4},
    {"id":47,"first_name":"Kimberlyn","profilepic_url":"http://dummyimage.com/197x127.png/ff4444/ffffff","performance_percentage":-44.2},
    {"id":48,"first_name":"Caz","profilepic_url":"http://dummyimage.com/139x109.png/5fa2dd/ffffff","performance_percentage":-37.1},
    {"id":49,"first_name":"Trixie","profilepic_url":"http://dummyimage.com/183x118.png/cc0000/ffffff","performance_percentage":-49.6},
    {"id":50,"first_name":"Teddy","profilepic_url":"http://dummyimage.com/182x154.png/dddddd/000000","performance_percentage":-31.7},
    {"id":51,"first_name":"Maurise","profilepic_url":"http://dummyimage.com/104x186.png/dddddd/000000","performance_percentage":1.2},
    {"id":52,"first_name":"Ringo","profilepic_url":"http://dummyimage.com/145x191.png/cc0000/ffffff","performance_percentage":-6.8},
    {"id":53,"first_name":"Laurella","profilepic_url":"http://dummyimage.com/110x107.png/ff4444/ffffff","performance_percentage":-23.6},
    {"id":54,"first_name":"Jordanna","profilepic_url":"http://dummyimage.com/132x124.png/ff4444/ffffff","performance_percentage":-22.9},
    {"id":55,"first_name":"Thea","profilepic_url":"http://dummyimage.com/136x179.png/dddddd/000000","performance_percentage":20.8},
    {"id":56,"first_name":"Suzann","profilepic_url":"http://dummyimage.com/147x152.png/ff4444/ffffff","performance_percentage":-46.1},
    {"id":57,"first_name":"Aubrey","profilepic_url":"http://dummyimage.com/199x117.png/cc0000/ffffff","performance_percentage":-3.3},
    {"id":58,"first_name":"Elicia","profilepic_url":"http://dummyimage.com/136x167.png/5fa2dd/ffffff","performance_percentage":-49.4},
    {"id":59,"first_name":"Herculie","profilepic_url":"http://dummyimage.com/199x143.png/dddddd/000000","performance_percentage":29.8},
    {"id":60,"first_name":"Pate","profilepic_url":"http://dummyimage.com/198x110.png/dddddd/000000","performance_percentage":-13.4},
    {"id":61,"first_name":"Kayle","profilepic_url":"http://dummyimage.com/167x136.png/5fa2dd/ffffff","performance_percentage":22.4},
    {"id":62,"first_name":"Ellary","profilepic_url":"http://dummyimage.com/145x109.png/cc0000/ffffff","performance_percentage":-47.0},
    {"id":63,"first_name":"Garv","profilepic_url":"http://dummyimage.com/146x137.png/cc0000/ffffff","performance_percentage":-35.1},
    {"id":64,"first_name":"Kathlin","profilepic_url":"http://dummyimage.com/172x171.png/5fa2dd/ffffff","performance_percentage":20.1},
    {"id":65,"first_name":"Franklyn","profilepic_url":"http://dummyimage.com/134x104.png/dddddd/000000","performance_percentage":3.9},
    {"id":66,"first_name":"Alexio","profilepic_url":"http://dummyimage.com/143x157.png/dddddd/000000","performance_percentage":-6.5},
    {"id":67,"first_name":"Truman","profilepic_url":"http://dummyimage.com/120x189.png/5fa2dd/ffffff","performance_percentage":11.8},
    {"id":68,"first_name":"Karim","profilepic_url":"http://dummyimage.com/134x133.png/dddddd/000000","performance_percentage":-30.6},
    {"id":69,"first_name":"Staffard","profilepic_url":"http://dummyimage.com/157x149.png/cc0000/ffffff","performance_percentage":-16.6},
    {"id":70,"first_name":"Lenna","profilepic_url":"http://dummyimage.com/192x127.png/5fa2dd/ffffff","performance_percentage":-4.8},
    {"id":71,"first_name":"Noach","profilepic_url":"http://dummyimage.com/198x120.png/5fa2dd/ffffff","performance_percentage":-0.7},
    {"id":72,"first_name":"Waylin","profilepic_url":"http://dummyimage.com/128x171.png/dddddd/000000","performance_percentage":-19.4},
    {"id":73,"first_name":"Fredra","profilepic_url":"http://dummyimage.com/104x121.png/dddddd/000000","performance_percentage":6.4},
    {"id":74,"first_name":"Leonie","profilepic_url":"http://dummyimage.com/100x168.png/cc0000/ffffff","performance_percentage":-13.8},
    {"id":75,"first_name":"Berkly","profilepic_url":"http://dummyimage.com/126x139.png/ff4444/ffffff","performance_percentage":-10.4},
    {"id":76,"first_name":"Early","profilepic_url":"http://dummyimage.com/119x148.png/5fa2dd/ffffff","performance_percentage":11.7},
    {"id":77,"first_name":"Quillan","profilepic_url":"http://dummyimage.com/167x181.png/5fa2dd/ffffff","performance_percentage":-23.8},
    {"id":78,"first_name":"Garrett","profilepic_url":"http://dummyimage.com/175x165.png/ff4444/ffffff","performance_percentage":1.9},
    {"id":79,"first_name":"Ingmar","profilepic_url":"http://dummyimage.com/116x181.png/ff4444/ffffff","performance_percentage":-41.2},
    {"id":80,"first_name":"Babb","profilepic_url":"http://dummyimage.com/112x154.png/cc0000/ffffff","performance_percentage":-32.6},
    {"id":81,"first_name":"Meredeth","profilepic_url":"http://dummyimage.com/179x144.png/ff4444/ffffff","performance_percentage":6.1},
    {"id":82,"first_name":"Artur","profilepic_url":"http://dummyimage.com/120x156.png/cc0000/ffffff","performance_percentage":23.7},
    {"id":83,"first_name":"Winne","profilepic_url":"http://dummyimage.com/166x175.png/ff4444/ffffff","performance_percentage":-11.4},
    {"id":84,"first_name":"Hally","profilepic_url":"http://dummyimage.com/112x133.png/5fa2dd/ffffff","performance_percentage":-16.4},
    {"id":85,"first_name":"Ferris","profilepic_url":"http://dummyimage.com/162x190.png/dddddd/000000","performance_percentage":-13.5},
    {"id":86,"first_name":"Cordie","profilepic_url":"http://dummyimage.com/105x171.png/cc0000/ffffff","performance_percentage":13.9},
    {"id":87,"first_name":"Ted","profilepic_url":"http://dummyimage.com/196x117.png/ff4444/ffffff","performance_percentage":26.4},
    {"id":88,"first_name":"Rosabelle","profilepic_url":"http://dummyimage.com/107x154.png/dddddd/000000","performance_percentage":24.9},
    {"id":89,"first_name":"Husein","profilepic_url":"http://dummyimage.com/178x137.png/cc0000/ffffff","performance_percentage":-48.2},
    {"id":90,"first_name":"Melisse","profilepic_url":"http://dummyimage.com/196x182.png/5fa2dd/ffffff","performance_percentage":18.3},
    {"id":91,"first_name":"Eduardo","profilepic_url":"http://dummyimage.com/181x134.png/cc0000/ffffff","performance_percentage":-2.0},
    {"id":92,"first_name":"Corny","profilepic_url":"http://dummyimage.com/121x173.png/dddddd/000000","performance_percentage":-3.2},
    {"id":93,"first_name":"Giacobo","profilepic_url":"http://dummyimage.com/146x169.png/cc0000/ffffff","performance_percentage":0.2},
    {"id":94,"first_name":"Iona","profilepic_url":"http://dummyimage.com/111x154.png/5fa2dd/ffffff","performance_percentage":-16.0},
    {"id":95,"first_name":"Asa","profilepic_url":"http://dummyimage.com/125x182.png/cc0000/ffffff","performance_percentage":5.4},
    {"id":96,"first_name":"Carri","profilepic_url":"http://dummyimage.com/196x144.png/cc0000/ffffff","performance_percentage":-42.4},
    {"id":97,"first_name":"Liana","profilepic_url":"http://dummyimage.com/147x180.png/dddddd/000000","performance_percentage":13.6},
    {"id":98,"first_name":"Dirk","profilepic_url":"http://dummyimage.com/166x118.png/cc0000/ffffff","performance_percentage":14.5},
    {"id":99,"first_name":"Devondra","profilepic_url":"http://dummyimage.com/187x157.png/dddddd/000000","performance_percentage":18.9},
    {"id":100,"first_name":"Shelby","profilepic_url":"http://dummyimage.com/155x134.png/cc0000/ffffff","performance_percentage":16.5}]
    function sortObjectsByIdDesc(objects) {
      return objects.sort((a, b) => b.performance_percentage - a.performance_percentage);
    }
    const sortedDummyData = sortObjectsByIdDesc(dummyData);
    res.status(200).send(sortedDummyData)
  },

  getFriendBoard: async (req, res) => {
    console.log(req.query);
    var userID = req.query.userID;
    // await axios.get(`http://localhost:8080/friendleaderboard`, {params: {"id" : userID}})
    // .then((result) => {
    //   res.status(200).send(result.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })

    var dummyData = [{"id":37,"first_name":"Cherin","profilepic_url":"http://dummyimage.com/131x161.png/dddddd/000000","performance_percentage":-28.0},
    {"id":66,"first_name":"Alexio","profilepic_url":"http://dummyimage.com/143x157.png/dddddd/000000","performance_percentage":-6.5},
    {"id":67,"first_name":"Truman","profilepic_url":"http://dummyimage.com/120x189.png/5fa2dd/ffffff","performance_percentage":11.8},
    {"id":68,"first_name":"Karim","profilepic_url":"http://dummyimage.com/134x133.png/dddddd/000000","performance_percentage":-30.6},
    {"id":69,"first_name":"Staffard","profilepic_url":"http://dummyimage.com/157x149.png/cc0000/ffffff","performance_percentage":-16.6},
    {"id":70,"first_name":"Lenna","profilepic_url":"http://dummyimage.com/192x127.png/5fa2dd/ffffff","performance_percentage":-4.8},
    {"id":71,"first_name":"Noach","profilepic_url":"http://dummyimage.com/198x120.png/5fa2dd/ffffff","performance_percentage":-0.7},
    {"id":72,"first_name":"Waylin","profilepic_url":"http://dummyimage.com/128x171.png/dddddd/000000","performance_percentage":-19.4},
    {"id":73,"first_name":"Fredra","profilepic_url":"http://dummyimage.com/104x121.png/dddddd/000000","performance_percentage":6.4},
    {"id":74,"first_name":"Leonie","profilepic_url":"http://dummyimage.com/100x168.png/cc0000/ffffff","performance_percentage":-13.8},
    {"id":75,"first_name":"Berkly","profilepic_url":"http://dummyimage.com/126x139.png/ff4444/ffffff","performance_percentage":-10.4},
    {"id":76,"first_name":"Early","profilepic_url":"http://dummyimage.com/119x148.png/5fa2dd/ffffff","performance_percentage":11.7},
    {"id":77,"first_name":"Quillan","profilepic_url":"http://dummyimage.com/167x181.png/5fa2dd/ffffff","performance_percentage":-23.8},
    {"id":78,"first_name":"Garrett","profilepic_url":"http://dummyimage.com/175x165.png/ff4444/ffffff","performance_percentage":1.9},
    {"id":79,"first_name":"Ingmar","profilepic_url":"http://dummyimage.com/116x181.png/ff4444/ffffff","performance_percentage":-41.2},
    {"id":80,"first_name":"Babb","profilepic_url":"http://dummyimage.com/112x154.png/cc0000/ffffff","performance_percentage":-32.6}]
    res.status(200).send(dummyData)
  },

  //updatePic









  //auto update
  // const updateRule = new schedule.RecurrenceRule();
  // updateRule.hour = 9;
  // updateRule.minute = 0;

  // const updateJob = schedule.scheduleJob(updateRule, async () => {
  //   try {
  //     // 在此處進行自動更新的 POST 請求
  //     const response = await axios.post('your_api_url', { your_data });
  //     console.log('Auto update success:', response.data);
  //   } catch (error) {
  //     console.error('Auto update error:', error);
  //   }
  // });

}