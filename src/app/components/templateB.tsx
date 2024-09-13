const templateB: any[] = [
  {
    category: "Work Book",
    items: [
      {
        name: "Work Book",
        formType: "select",
        formOptions: [
          "K0_MSB_Sticker_Book",
          "K0_MSB_Tracing_Letter",
          "K0_Sight_Words_1",
          "K0_Sight_Words_2",
        ],
        progress: {
          selection: "K0_MSB_Sticker_Book",
          progress: "need review",
        },
      },
    ],
  },
  {
    category: "SIE",
    items: [
      {
        name: "My Sound book",
        formType: "selectWithInput",
        formOptions: [
          "K0_MSB_Sticker_Book",
          "K0_MSB_Tracing_Letter",
          "K0_Sight_Words_1",
          "K0_Sight_Words_2",
        ],
        progress: {
          selection: "K0_MSB_Sticker_Book",
          comment: "book read",
          progress: "incompleted",
        },
      },
    ],
  },
];

export default templateB;
