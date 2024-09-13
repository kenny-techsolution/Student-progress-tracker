export interface Progress {
  material: string | null;
  status: "review" | "complete" | "N/A";
}
export interface ProgressItem {
  name: string;
  level: "K0" | "K1" | "K2" | "K3" | "ALL";
  formType: string;
  formOptions: string[];
  progress: Progress;
}
export interface ProgressCategory {
  name: string;
  items: ProgressItem[];
}
const templateB: ProgressCategory[] = [
  {
    name: "Work Book",
    items: [
      {
        name: "K0 Work Book",
        level: "K0",
        formType: "select",
        formOptions: [
          "K0_MSB_Sticker_Book",
          "K0_MSB_Tracing_Letter",
          "K0_Sight_Words_1",
          "K0_Sight_Words_2",
        ],
        progress: {
          material: "K0_MSB_Sticker_Book",
          status: "review",
        },
      },
    ],
  },
  {
    name: "Short Vowels",
    items: [
      {
        name: "Short Vowels Box 1",
        level: "K1",
        formType: "select",
        formOptions: ["a", "e", "i", "o", "u"],
        progress: {
          material: null,
          status: null,
        },
      },
      {
        name: "Short Vowels Box 2",
        level: "K2",
        formType: "select",
        formOptions: ["a", "e", "i", "o", "u"],
        progress: {
          material: null,
          status: null,
        },
      },
    ],
  },
];

export default templateB;
