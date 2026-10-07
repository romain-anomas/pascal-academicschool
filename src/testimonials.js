// ✏️ STUDENT STORIES ("What our students say")
// The 6 entries below are SAMPLES written as placeholders (photos are cropped from the academy's
// promotional images). They show a small "Sample" tag on the site.
// TO REPLACE: swap in real students (with their permission): put the photo in src/assets/testimonials/,
// then edit/replace an entry. Entries WITHOUT `sample: true` show no "Sample" tag.
// `quote` can have en / fr / rw / sw; a missing language falls back to English.
const photo = (f) => new URL(`./assets/testimonials/${f}`, import.meta.url).href

export const TESTIMONIALS = [
  { sample: true, name: 'Aline Uwase', course: 'juice', photo: photo('aline-uwase.jpg'), quote: {
    en: 'I learned how to blend fresh juice, pack it nicely and calculate a fair price. Every class is hands-on.',
    rw: 'Nize gukora juice nshya, kuyipakira neza no kubara igiciro gikwiye. Buri somo ni imyitozo ifatika.',
    fr: 'J’ai appris à préparer des jus frais, à bien les emballer et à fixer un prix juste. Chaque cours est pratique.',
    sw: 'Nimejifunza kutengeneza juisi safi, kuifungasha vizuri na kukokotoa bei ya haki. Kila darasa ni la vitendo.' } },
  { sample: true, name: 'Eric Niyonzima', course: 'fnb', photo: photo('eric-niyonzima.jpg'), quote: {
    en: 'The trainers show you table service step by step, then you practise it yourself. I feel much more confident serving guests.',
    rw: 'Abarimu bakwereka gutanga serivisi ku meza intambwe ku yindi, nawe ukabyitoza. Ndumva nizeye cyane kwakira abashyitsi.',
    fr: 'Les formateurs montrent le service en salle étape par étape, puis on s’exerce soi-même. Je me sens bien plus à l’aise avec les clients.',
    sw: 'Wakufunzi wanakuonyesha huduma ya mezani hatua kwa hatua, kisha unafanya mazoezi mwenyewe. Najiamini zaidi kuhudumia wageni.' } },
  { sample: true, name: 'Grace Mukamana', course: 'hospitality', photo: photo('grace-mukamana.jpg'), quote: {
    en: 'Besides the skills, we learn manners, grooming and how to speak with confidence. It prepares you for real work.',
    rw: 'Uretse ubumenyi, twiga imyitwarire, isuku n’imyambarire no kuvuga nta bwoba. Bigutegurira akazi nyakuri.',
    fr: 'En plus des compétences, nous apprenons les bonnes manières, la présentation et à parler avec assurance. Cela prépare au vrai travail.',
    sw: 'Mbali na ujuzi, tunajifunza adabu, mwonekano na kuzungumza kwa kujiamini. Inakuandaa kwa kazi halisi.' } },
  { sample: true, name: 'Patrick Habimana', course: 'soap', photo: photo('patrick-habimana.jpg'), quote: {
    en: 'I never thought I could make soap and candles myself. Now I am learning how to package and brand them to sell.',
    rw: 'Sinatekerezaga ko nakwikorera isabune n’amakandle. Ubu niga uburyo bwo kubipakira no kubimenyekanisha kugira ngo mbigurishe.',
    fr: 'Je n’aurais jamais cru pouvoir fabriquer moi-même du savon et des bougies. J’apprends maintenant à les emballer et à les présenter pour les vendre.',
    sw: 'Sikuwahi kufikiri ningeweza kutengeneza sabuni na mishumaa mwenyewe. Sasa najifunza kuzifungasha na kuzipa chapa ili nizuze.' } },
  { sample: true, name: 'Chantal Ingabire', course: 'pastry', photo: photo('chantal-ingabire.jpg'), quote: {
    en: 'Baking cakes and cupcakes is my passion. Here I learn the techniques and how to sell what I make.',
    rw: 'Guteka keke na cupcakes ni ibyo nkunda. Hano niga uburyo bwo guteka no kugurisha ibyo nakoze.',
    fr: 'J’adore préparer des gâteaux et des cupcakes. Ici, j’apprends les techniques et comment vendre mes créations.',
    sw: 'Napenda kuoka keki na cupcakes. Hapa najifunza mbinu na jinsi ya kuuza ninachotengeneza.' } },
  { sample: true, name: 'Jean Bosco Mugisha', course: 'photography', photo: photo('jean-bosco-mugisha.jpg'), quote: {
    en: 'The photography and editing lessons give me real skills for taking photos at events.',
    rw: 'Amasomo yo gufotora no guhindura amafoto aduha ubumenyi nyakuri bwo gufotora mu birori.',
    fr: 'Les cours de photographie et de retouche me donnent de vraies compétences pour photographier des événements.',
    sw: 'Masomo ya upigaji picha na kuhariri yananipa ujuzi halisi wa kupiga picha za matukio.' } },
]
