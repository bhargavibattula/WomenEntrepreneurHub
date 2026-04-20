import replay from "../assets/replay.svg"
import pause from "../assets/pause.svg"
import play from "../assets/replay.svg"
import video1 from "../assets/videos/4065635-uhd_2732_1440_25fps.mp4"
import video2 from "../assets/videos/5971786-uhd_2732_1440_25fps.mp4"
import video3 from "../assets/videos/6774652-uhd_2560_1440_30fps.mp4"
import video4 from "../assets/videos/7652013-uhd_2560_1440_30fps.mp4"

export const replayImg = replay;
export const pauseImg = pause;
export const playImg = play;

export const navItems = {
    
    "business" : [ 
        { name : "All business" , path : "/business/all-business"},
        { name : "create business" , path : "/business/post-business"},
        { name : "Your business" , path : "/business/your-business"},
    ] , 
    
    "events" : [
        {name : "All events" , path : "/events/all-events"},
        {name : "host an event" , path : "/events/host-event"},
    ] ,
    "resource hub" : [
        {name : "articles" , path : "/resource/articles"},
        {name : "post articles" , path : "/resource/post-articles"},
    ], 
    "for employees" : [
        {name : "Avaliable Jobs" , path : "/job "},
        {name : "Create A Job" , path : "/job/create"},
    ],
     "community" : [
        {name : "chat with community" , path : "/chat-community"}
     ]
}


export const countriesWithStates = {
    Afghanistan: ['Badakhshan', 'Balkh', 'Kabul', 'Kandahar'],
    Albania: ['Berat', 'Durrës', 'Fier', 'Tirana'],
    Algeria: ['Algiers', 'Oran', 'Constantine', 'Blida'],
    Argentina: ['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza'],
    Australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
    Austria: ['Vienna', 'Tyrol', 'Salzburg', 'Carinthia'],
    Bangladesh: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi'],
    Belgium: ['Antwerp', 'Brussels', 'Flanders', 'Wallonia'],
    Brazil: ['São Paulo', 'Rio de Janeiro', 'Bahia', 'Paraná'],
    Canada: ['Alberta', 'British Columbia', 'Ontario', 'Quebec'],
    China: ['Beijing', 'Shanghai', 'Guangdong', 'Sichuan'],
    Egypt: ['Cairo', 'Alexandria', 'Giza', 'Luxor'],
    France: ['Île-de-France', 'Provence-Alpes-Côte d’Azur', 'Normandy', 'Brittany'],
    Germany: ['Bavaria', 'Berlin', 'Hamburg', 'North Rhine-Westphalia'],
    India: [
        // States
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chhattisgarh',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
      ],
    Indonesia: ['Jakarta', 'Bali', 'East Java', 'West Java'],
    Italy: ['Lazio', 'Lombardy', 'Tuscany', 'Sicily'],
    Japan: ['Tokyo', 'Osaka', 'Hokkaido', 'Kyoto'],
    Kenya: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'],
    Mexico: ['Mexico City', 'Jalisco', 'Nuevo León', 'Yucatán'],
    Nigeria: ['Lagos', 'Abuja', 'Kano', 'Rivers'],
    Pakistan: ['Sindh', 'Punjab', 'Khyber Pakhtunkhwa', 'Balochistan'],
    Russia: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Sverdlovsk'],
    SaudiArabia: ['Riyadh', 'Jeddah', 'Mecca', 'Medina'],
    SouthAfrica: ['Gauteng', 'KwaZulu-Natal', 'Western Cape', 'Eastern Cape'],
    Spain: ['Catalonia', 'Madrid', 'Andalusia', 'Valencia'],
    Sweden: ['Stockholm', 'Gothenburg', 'Malmö', 'Uppsala'],
    Switzerland: ['Zurich', 'Geneva', 'Bern', 'Vaud'],
    Turkey: ['Istanbul', 'Ankara', 'Izmir', 'Bursa'],
    UK: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    USA: ['California', 'Florida', 'New York', 'Texas', 'Washington'],
    Venezuela: ['Caracas', 'Zulia', 'Miranda', 'Bolívar'],
    Vietnam: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Haiphong'],
  };
  

export  const eventTags = [
    "Women Empowerment",
    "Entrepreneurship",
    "Leadership",
    "Networking",
    "Business Growth",
    "Personal Development",
    "Innovation",
    "Funding",
    "Mentorship",
    "Startups",
    "Marketing",
    "Community",
    "Success Stories",
  ];
  

  

  export const hightlightsSlides = [
    {
      id: 1,
      textLists: [
        "Connect with industry leaders",
        "Exclusive mentorship programs",
        "Access to funding opportunities",
      ],
      video: video4,
      videoDuration: 26,
    },
    {
      id: 2,
      textLists: [
        "Workshops and skill-building events",
        "Collaborative spaces for networking",
        "Women-led success stories",
      ],
      video: video2,
      videoDuration: 12,
    },
    {
      id: 3,
      textLists: [
        "Personalized career development plans",
        "Expert business insights and tips",
        "Roundtable discussions with peers",
      ],
      video: video3,
      videoDuration: 13,
    },
    {
      id: 4,
      textLists: [
        "Online platform for resources and tools",
        "Global community of women entrepreneurs",
        "Flexible membership options",
      ],
      video: video1,
      videoDuration: 10,
    },
  ];
  
  