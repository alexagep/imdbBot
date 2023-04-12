const items = [
  {
    id: "tt6718170",
    rank: "1",
    gross: "$204.6M",
    image:
      "https://m.media-amazon.com/images/M/MV5BOTJhNzlmNzctNTU5Yy00N2YwLThhMjQtZDM0YjEzN2Y0ZjNhXkEyXkFqcGdeQXVyMTEwMTQ4MzU5._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "The Super Mario Bros. Movie",
    weeks: "1",
    weekend: "$146.4M",
  },
  {
    id: "tt10366206",
    rank: "2",
    gross: "$146.9M",
    image:
      "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "John Wick: Chapter 4",
    weeks: "3",
    weekend: "$14.5M",
  },
  {
    id: "tt16419074",
    rank: "3",
    gross: "$20.2M",
    image:
      "https://m.media-amazon.com/images/M/MV5BYmNlOTNlYjUtM2U3Yy00M2ZjLTkxZDQtN2NiNGZiZDI0ZjE3XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "Air",
    weeks: "1",
    weekend: "$14.5M",
  },
  {
    id: "tt2906216",
    rank: "4",
    gross: "$61.7M",
    image:
      "https://m.media-amazon.com/images/M/MV5BZjAyMGMwYTEtNDk4ZS00YmY0LThhZjUtOWI4ZjFmZmU4N2I3XkEyXkFqcGdeQXVyMTEyNzQ1MTk0._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "Dungeons & Dragons: Honor Among Thieves",
    weeks: "2",
    weekend: "$13.9M",
  },
  {
    id: "tt17663992",
    rank: "5",
    gross: "$104.0M",
    image:
      "https://m.media-amazon.com/images/M/MV5BODBjM2M4YTQtNmJlMS00MGU2LWI4ZGYtZTA1MzdmZDAyMjFkXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "Scream VI",
    weeks: "5",
    weekend: "$3.4M",
  },
  {
    id: "tt8277246",
    rank: "6",
    gross: "$10.6M",
    image:
      "https://m.media-amazon.com/images/M/MV5BZTU5MTY4OGMtYTRiMS00ZTA1LThmMGQtOWQ4YzE4NThlYjljXkEyXkFqcGdeQXVyNzYzMjAyMzU@._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "His Only Son",
    weeks: "2",
    weekend: "$2.8M",
  },
  {
    id: "tt11145118",
    rank: "7",
    gross: "$153.2M",
    image:
      "https://m.media-amazon.com/images/M/MV5BYWY1ZDY4MmQtYjhiYS00N2QwLTk1NzgtOWI2YzUwZThjNDYwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "Creed III",
    weeks: "6",
    weekend: "$2.8M",
  },
  {
    id: "tt10151854",
    rank: "8",
    gross: "$56.6M",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzJlM2NmZTItOGQyYS00MmE2LTkwZGUtNDFkNmJmZjRjZjcxXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "Shazam! Fury of the Gods",
    weeks: "4",
    weekend: "$1.6M",
  },
  {
    id: "tt12427158",
    rank: "9",
    gross: "$3.0M",
    image:
      "https://m.media-amazon.com/images/M/MV5BYTM4Y2FhODgtMjU2Yy00NzNjLWI3MTYtM2I3ZTRmYzczYzc0XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "A Thousand and One",
    weeks: "2",
    weekend: "$600K",
  },
  {
    id: "tt14472156",
    rank: "10",
    gross: "$571K",
    image:
      "https://m.media-amazon.com/images/M/MV5BMWFmOTU2ZjctN2VhMS00Yzg4LWIyOGEtMTgwZTdjYTMyZjNkXkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_UX128_CR0,3,128,176_AL_.jpg",
    title: "Paint",
    weeks: "1",
    weekend: "$571K",
  },
];

const table2Data = items.map((item) => {
  return {
    column1: "valueA",
    table1Id: item.id, // Use the ID of the created row in Table1
  };
});
// table2Data.pop()

const first100Elements = table2Data.slice(0, 3);  // Slicing to get the first 100 elements


console.log(first100Elements);