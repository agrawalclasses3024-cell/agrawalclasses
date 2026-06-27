export interface DistrictData {
  slug: string;
  name: string;
  nameHQ: string; // district headquarters city name
  state: string;
  nearbyTowns: string[];
  studentCount: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroHeading: string;
  heroSubheading: string;
  localNote: string;
  faq: { q: string; a: string }[];
  jsonLdAreaServed: string[];
}

const districts: DistrictData[] = [
  {
    slug: "gopalganj",
    name: "Gopalganj",
    nameHQ: "Gopalganj",
    state: "Bihar",
    nearbyTowns: ["Hathua", "Mirganj", "Barauli", "Thawe", "Uchkagaon", "Kuchaikote", "Bhorey", "Phulwaria", "Manjha", "Sidhwalia"],
    studentCount: "500+",
    metaTitle: "Best Commerce Classes in Gopalganj Bihar | CA Nidhi Agrawal | 11th 12th B.Com",
    metaDescription: "Best Commerce coaching in Gopalganj Bihar by CA Nidhi Agrawal. Class 11, 12 & B.Com — Accountancy, Business Studies, Economics. Bihar Board (BSEB) specialist. Online & offline batches for Gopalganj, Hathua, Mirganj, Barauli, Thawe students.",
    keywords: [
      "Commerce Classes Gopalganj", "Best Commerce Classes Gopalganj",
      "Commerce Coaching Gopalganj", "CA Nidhi Agrawal Gopalganj",
      "11th Commerce Classes Gopalganj", "12th Commerce Classes Gopalganj",
      "BSEB Commerce Gopalganj", "Bihar Board Commerce Gopalganj",
      "Accountancy Classes Gopalganj", "Economics Classes Gopalganj",
      "Business Studies Classes Gopalganj", "Online Commerce Classes Gopalganj",
      "Commerce Tuition Gopalganj", "Best Commerce Teacher Gopalganj",
      "Commerce Classes Hathua", "Commerce Classes Mirganj",
      "Commerce Classes Barauli", "Commerce Classes Thawe",
      "Commerce Classes Uchkagaon", "11th 12th Commerce Gopalganj Bihar",
    ],
    heroHeading: "Best Commerce Classes in Gopalganj, Bihar",
    heroSubheading: "CA Nidhi Agrawal — Chartered Accountant & Commerce Educator based in Gopalganj. Expert coaching for Class 11, 12 & B.Com students across the entire Gopalganj district.",
    localNote: "Agrawal Classes is based right here in Gopalganj. Students from Hathua, Mirganj, Barauli, Thawe and all surrounding towns have been joining our batches for years — both face-to-face at our Gopalganj centre and online from the comfort of their homes.",
    faq: [
      { q: "Kya Gopalganj me face-to-face batches available hain?", a: "Haan — Agrawal Classes ka main centre Gopalganj me hi hai. Aap seedha aake face-to-face batch join kar sakte hain ya online/recorded bhi le sakte hain." },
      { q: "Hathua, Mirganj aur Barauli ke students kaise join kar sakte hain?", a: "Nearby towns ke students online live batches ya recorded lectures join kar sakte hain. WhatsApp pe contact karo — schedule aur fee details milegi." },
      { q: "Bihar Board (BSEB) ke liye classes specifically available hain?", a: "Bilkul — CA Nidhi Agrawal BSEB Commerce specialist hain. Sabhi classes Bihar Board syllabus ke hisaab se padhai jaati hain." },
      { q: "Class 11 ke liye admission kab hota hai?", a: "April-May me main batch shuru hoti hai. Crash course aur mid-year batches bhi available hain. WhatsApp pe enquiry karo." },
    ],
    jsonLdAreaServed: ["Gopalganj", "Hathua", "Mirganj", "Barauli", "Thawe", "Uchkagaon"],
  },
  {
    slug: "siwan",
    name: "Siwan",
    nameHQ: "Siwan",
    state: "Bihar",
    nearbyTowns: ["Maharajganj", "Darauli", "Goriakothi", "Raghunathpur", "Mairwa", "Basantpur", "Ziradei"],
    studentCount: "200+",
    metaTitle: "Commerce Classes Siwan Bihar | 11th 12th B.Com Coaching | CA Nidhi Agrawal",
    metaDescription: "Commerce coaching for Siwan Bihar students by CA Nidhi Agrawal. Class 11, 12 & B.Com — Accountancy, Business Studies, Economics. Online live classes + recorded lectures for BSEB Bihar Board.",
    keywords: [
      "Commerce Classes Siwan", "Commerce Coaching Siwan",
      "11th Commerce Classes Siwan", "12th Commerce Classes Siwan",
      "Online Commerce Classes Siwan", "BSEB Commerce Siwan",
      "Bihar Board Commerce Siwan", "Accountancy Classes Siwan",
      "Best Commerce Teacher Siwan", "11th 12th Commerce Siwan Bihar",
      "Commerce Classes Maharajganj", "Commerce Classes Mairwa",
    ],
    heroHeading: "Commerce Classes for Siwan Students | CA Nidhi Agrawal",
    heroSubheading: "Expert Commerce coaching for Class 11, 12 & B.Com students from Siwan district. Live online classes, recorded lectures — study from Siwan without travel.",
    localNote: "Siwan ke 200+ students Agrawal Classes se padhte hain — sab online live batches ya recorded lectures ke through. Gopalganj se sirf 30 km door hone ke kaaran kuch students directly bhi aate hain.",
    faq: [
      { q: "Kya Siwan se online join kar sakte hain?", a: "Bilkul — sare online live batches aur recorded lectures Siwan ke students ke liye available hain. Koi travel ki zarurat nahi." },
      { q: "Siwan ke kaun kaun se towns cover hote hain?", a: "Siwan, Maharajganj, Darauli, Mairwa, Ziradei, Basantpur — sab jagah ke students online join kar sakte hain." },
      { q: "Fee kitni hai aur kaise payment hoti hai?", a: "Fee details ke liye WhatsApp pe contact karo. Online UPI/bank transfer se payment hoti hai." },
    ],
    jsonLdAreaServed: ["Siwan", "Maharajganj", "Darauli", "Mairwa", "Ziradei"],
  },
  {
    slug: "saran",
    name: "Saran",
    nameHQ: "Chapra",
    state: "Bihar",
    nearbyTowns: ["Chapra", "Sonpur", "Marhaura", "Dighwara", "Parsa", "Maker", "Revelganj", "Taraiya"],
    studentCount: "150+",
    metaTitle: "Commerce Classes Chapra Saran Bihar | 11th 12th Coaching | CA Nidhi Agrawal",
    metaDescription: "Commerce coaching for Chapra (Saran district) Bihar students by CA Nidhi Agrawal. Class 11, 12 & B.Com — Accountancy, Business Studies, Economics. Online live classes for BSEB Bihar Board.",
    keywords: [
      "Commerce Classes Chapra", "Commerce Coaching Chapra",
      "Commerce Classes Saran", "Commerce Coaching Saran",
      "11th Commerce Classes Chapra", "12th Commerce Classes Chapra",
      "Online Commerce Classes Chapra", "BSEB Commerce Chapra",
      "Bihar Board Commerce Saran", "Accountancy Classes Chapra",
      "Best Commerce Teacher Chapra", "11th 12th Commerce Saran Bihar",
      "Commerce Classes Sonpur", "Commerce Classes Marhaura",
    ],
    heroHeading: "Commerce Classes for Chapra & Saran District | CA Nidhi Agrawal",
    heroSubheading: "Expert Commerce coaching for Class 11, 12 & B.Com students from Chapra and entire Saran district. Live online classes — no need to travel.",
    localNote: "Saran district ke Chapra, Sonpur, Marhaura aur aas paas ke towns ke students Agrawal Classes ke online live batches join karte hain. CA Nidhi Agrawal ka BSEB-focused teaching method Saran ke students me bahut popular hai.",
    faq: [
      { q: "Chapra se online classes join kar sakte hain?", a: "Haan — sare batches online available hain. Live classes, recorded lectures aur doubt sessions sab online hote hain." },
      { q: "BSEB Chapra ke liye specifically prepare karte hain?", a: "Bilkul — Bihar Board syllabus ke hisaab se padhai hoti hai. Previous year papers aur model sets bhi cover kiye jaate hain." },
    ],
    jsonLdAreaServed: ["Chapra", "Saran", "Sonpur", "Marhaura", "Dighwara", "Revelganj"],
  },
  {
    slug: "east-champaran",
    name: "East Champaran",
    nameHQ: "Motihari",
    state: "Bihar",
    nearbyTowns: ["Motihari", "Raxaul", "Adapur", "Chiraiya", "Pakridayal", "Areraj", "Dhaka", "Phenhara"],
    studentCount: "100+",
    metaTitle: "Commerce Classes Motihari East Champaran | 11th 12th Coaching | CA Nidhi Agrawal",
    metaDescription: "Commerce coaching for Motihari (East Champaran) Bihar students by CA Nidhi Agrawal. Class 11, 12 & B.Com — Accountancy, Business Studies, Economics. Online live classes for BSEB Bihar Board.",
    keywords: [
      "Commerce Classes Motihari", "Commerce Coaching Motihari",
      "Commerce Classes East Champaran", "Commerce Coaching East Champaran",
      "11th Commerce Classes Motihari", "12th Commerce Classes Motihari",
      "Online Commerce Classes Motihari", "BSEB Commerce Motihari",
      "Bihar Board Commerce East Champaran", "Accountancy Classes Motihari",
      "Commerce Classes Raxaul", "11th 12th Commerce East Champaran Bihar",
    ],
    heroHeading: "Commerce Classes for Motihari & East Champaran | CA Nidhi Agrawal",
    heroSubheading: "Expert Commerce coaching for Class 11, 12 & B.Com students from Motihari and East Champaran district. Online live classes by CA Nidhi Agrawal.",
    localNote: "East Champaran ke Motihari, Raxaul aur aas paas ke students online live batches se padh sakte hain. Distance koi problem nahi — CA Nidhi Agrawal ki online classes bilkul classroom jaisi hain.",
    faq: [
      { q: "Motihari se join kar sakte hain?", a: "Haan — sare batches online available hain. Motihari, Raxaul, Adapur sab jagah se students join karte hain." },
      { q: "Notes aur study material milega?", a: "Haan — sare enrolled students ko PDF notes, practice sets aur previous year papers milte hain." },
    ],
    jsonLdAreaServed: ["Motihari", "East Champaran", "Raxaul", "Adapur", "Chiraiya", "Areraj"],
  },
  {
    slug: "west-champaran",
    name: "West Champaran",
    nameHQ: "Bettiah",
    state: "Bihar",
    nearbyTowns: ["Bettiah", "Bagaha", "Narkatiaganj", "Ramnagar", "Mainatand", "Gaunaha", "Chanpatia"],
    studentCount: "80+",
    metaTitle: "Commerce Classes Bettiah West Champaran | 11th 12th Coaching | CA Nidhi Agrawal",
    metaDescription: "Commerce coaching for Bettiah (West Champaran) Bihar students by CA Nidhi Agrawal. Class 11, 12 & B.Com — Accountancy, Business Studies, Economics. Online live classes for BSEB Bihar Board.",
    keywords: [
      "Commerce Classes Bettiah", "Commerce Coaching Bettiah",
      "Commerce Classes West Champaran", "Commerce Coaching West Champaran",
      "11th Commerce Classes Bettiah", "12th Commerce Classes Bettiah",
      "Online Commerce Classes Bettiah", "BSEB Commerce Bettiah",
      "Bihar Board Commerce West Champaran", "Accountancy Classes Bettiah",
      "Commerce Classes Bagaha", "Commerce Classes Narkatiaganj",
      "11th 12th Commerce West Champaran Bihar",
    ],
    heroHeading: "Commerce Classes for Bettiah & West Champaran | CA Nidhi Agrawal",
    heroSubheading: "Expert Commerce coaching for Class 11, 12 & B.Com students from Bettiah and West Champaran district. Online live classes by CA Nidhi Agrawal.",
    localNote: "West Champaran ke Bettiah, Bagaha, Narkatiaganj aur surrounding towns ke students online live batches join kar sakte hain. CA Nidhi Agrawal ki detailed teaching style aur BSEB focus ne West Champaran me bhi students ka vishwas jita hai.",
    faq: [
      { q: "Bettiah se online join kar sakte hain?", a: "Haan — sare batches online available hain. Bettiah, Bagaha, Narkatiaganj sab se join kar sakte hain." },
      { q: "Doubt clearing sessions hote hain?", a: "Haan — regular doubt sessions hote hain. WhatsApp pe bhi doubts pooch sakte hain." },
    ],
    jsonLdAreaServed: ["Bettiah", "West Champaran", "Bagaha", "Narkatiaganj", "Ramnagar"],
  },
];

export default districts;

export function getDistrict(slug: string): DistrictData | undefined {
  return districts.find((d) => d.slug === slug);
}
