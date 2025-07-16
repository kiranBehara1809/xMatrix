const CATEGORY_ONE = {
  shortName: "CA",
  label: "Category A",
  colorCode: "#116129e8",
  refColorCode: "Greenshade",
};
const CATEGORY_TWO = {
  shortName: "CB",
  label: "Category B",
  colorCode: "#045c84e6",
  refColorCode: "teelshade",
};
const CATEGORY_THREE = {
  shortName: "CC",
  label: "Category C",
  colorCode: "#900527e3",
  refColorCode: "redshade",
};
const CATEGORY_FOUR = {
  shortName: "CD",
  label: "Category D",
  colorCode: "#141a5bbf",
  refColorCode: "Indigoshade",
};

const HIGHLIGHT_COLOR_OBJ_PURPLE = {
  colorCode: "#800080", // purple
  priority: "high",
};
const HIGHLIGHT_COLOR_HIGH_OBJ = {
  colorCode: "#FF0000",
  priority: "high",
};
const HIGHLIGHT_COLOR_MEDIUM_OBJ = {
  colorCode: "#FFFF00",
  priority: "medium",
};
const HIGHLIGHT_COLOR_LOW_OBJ = {
  colorCode: "#008000",
  priority: "low",
};

const ALL_CATEGORIES = [
  CATEGORY_ONE,
  CATEGORY_TWO,
  CATEGORY_THREE,
  CATEGORY_FOUR,
];

const QUADRANTS_CONSTANT = {
  quadrants: [
    {
      quadrantName: "Top Level Improvements",
      quadrantColor: "#2979ff",
      qRefColor: "blue",
      quadrantPosition: "top",
      basePosition: "top",
      updatedPosition: "",
      quadrantListItems: [
        {
          rowName: "Roll out targeted campaigns for investment services",
          rowId: "7f41e5c1-98a3-4eaf-85ff-1b7f8a6ad812",
          rowType: "quandrantRow",
          sortOrder: "1",
          category: CATEGORY_ONE,
          highlight: HIGHLIGHT_COLOR_OBJ_PURPLE,
          highlightEnabled: false,
          intersections: [
            { type: "RL", rowId: "b91e9381-5906-470a-a9a5-fc511d93051d" },
            { type: "RL", rowId: "61b0afcc-0530-4c10-8a0d-75fc504e2b7f" },
            { type: "RL", rowId: "b7c6489c-c624-4a9e-8db9-c25edc65e278" },
            { type: "PR", rowId: "223f204c-ca11-4ffd-91f8-1178adc345d0" },
          ],
        },
        {
          rowName: "Launch a competitive home loan interest rate offer",
          rowId: "56ae217e-d6f2-49f1-b8d3-5cb98096c6f9",
          rowType: "quandrantRow",
          sortOrder: "2",
          category: CATEGORY_TWO,
          intersections: [
            { type: "RL", rowId: "61b0afcc-0530-4c10-8a0d-75fc504e2b7f" },
            { type: "RL", rowId: "b91e9381-5906-470a-a9a5-fc511d93051d" },
            { type: "RL", rowId: "30b36167-c020-4c71-9405-9e5a725b66ae" },
            { type: "RL", rowId: "d05b037e-8e27-4c27-b8c9-1110833b0fc7" },
            { type: "RL", rowId: "ae1bc66d-2d3a-41cc-8cde-16ef76f9bdad" },
            { type: "RL", rowId: "b7c6489c-c624-4a9e-8db9-c25edc65e278" },
            { type: "SR", rowId: "4d10b9c1-268b-4f0a-a803-5104b6871a7d" },
            { type: "SR", rowId: "4812dcfb-7a18-4f9e-ba95-f945760de3b7" },
            { type: "SR", rowId: "5a6f55cb-f840-497b-aa43-f8109017f465" },
            { type: "PR", rowId: "223f204c-ca11-4ffd-91f8-1178adc345d0" },
          ],
        },
        {
          rowName:
            "Develop and launch an enhanced mobile banking app with features like mobile check deposit, budgeting tools",
          rowId: "1c4db07b-ff76-49c2-b8b4-eccdf8eec06f",
          rowType: "quandrantRow",
          category: CATEGORY_ONE,
          sortOrder: "3",
          intersections: [
            { type: "RL", rowId: "30b36167-c020-4c71-9405-9e5a725b66ae" },
            { type: "RL", rowId: "d05b037e-8e27-4c27-b8c9-1110833b0fc7" },
            { type: "RL", rowId: "457f56ee-64bb-41a2-ae54-2d37a325c9e3" },
            { type: "SR", rowId: "4d10b9c1-268b-4f0a-a803-5104b6871a7d" },
            { type: "PR", rowId: "4812dcfb-7a18-4f9e-ba95-f945760de3b7" },
            { type: "PR", rowId: "5a6f55cb-f840-497b-aa43-f8109017f465" },
            { type: "SR", rowId: "223f204c-ca11-4ffd-91f8-1178adc345d0" },
          ],
        },
        {
          rowName:
            "Implement a new customer service training program for all customer-facing employees",
          rowId: "ccf7814e-7d61-44f6-8be0-df7647d37a47",
          rowType: "quandrantRow",
          sortOrder: "4",
          category: CATEGORY_FOUR,
          intersections: [
            { type: "RL", rowId: "30b36167-c020-4c71-9405-9e5a725b66ae" },
            { type: "RL", rowId: "d05b037e-8e27-4c27-b8c9-1110833b0fc7" },
            { type: "RL", rowId: "df5bd6f5-6f0f-48d4-b257-560b2ae449f4" },
            { type: "PR", rowId: "4d10b9c1-268b-4f0a-a803-5104b6871a7d" },
          ],
        },
      ],
    },
    {
      quadrantName: "Metrics to Improve",
      quadrantColor: "#ff9100",
      qRefColor: "orange",
      quadrantPosition: "right",
      basePosition: "right",
      updatedPosition: "",
      quadrantListItems: [
        {
          rowName:
            "The number of app downloads and active users is measured monthly",
          rowId: "df5bd6f5-6f0f-48d4-b257-560b2ae449f4",
          rowType: "quandrantRow",
          sortOrder: "1",
          category: CATEGORY_THREE,
        },
        {
          rowName: "Customer satisfaction scores from quarterly surveys",
          rowId: "457f56ee-64bb-41a2-ae54-2d37a325c9e3",
          rowType: "quandrantRow",
          sortOrder: "2",
          category: CATEGORY_THREE,
          highlight: HIGHLIGHT_COLOR_OBJ_PURPLE,
          highlightEnabled: false,
        },
        {
          rowName: "Yearly growth in assets under Management",
          rowId: "ae1bc66d-2d3a-41cc-8cde-16ef76f9bdad",
          rowType: "quandrantRow",
          sortOrder: "3",
          category: CATEGORY_FOUR,
        },
        {
          rowName: "Monthly home loan approval rates",
          rowId: "b7c6489c-c624-4a9e-8db9-c25edc65e278",
          rowType: "quandrantRow",
          sortOrder: "4",
          category: CATEGORY_ONE,
        },
        {
          rowName: "",
          rowId: "4d8238a5-82c9-45a7-b746-c8183ba7edfd",
          rowType: "quandrantRow",
          sortOrder: "5",
        },
        {
          rowName: "John Dyer",
          rowId: "4d10b9c1-268b-4f0a-a803-5104b6871a7d",
          rowType: "quandrantOwner",
          sortOrder: "6",
        },
        {
          rowName: "Nicholas Joshua",
          rowId: "4812dcfb-7a18-4f9e-ba95-f945760de3b7",
          rowType: "quandrantOwner",
          sortOrder: "7",
        },
        {
          rowName: "Grigor Nervoff",
          rowId: "5a6f55cb-f840-497b-aa43-f8109017f465",
          rowType: "quandrantOwner",
          sortOrder: "8",
        },
        {
          rowName: "Dimitris Kazanakis",
          rowId: "223f204c-ca11-4ffd-91f8-1178adc345d0",
          rowType: "quandrantOwner",
          sortOrder: "9",
        },
      ],
    },
    {
      quadrantName: "Long-Term Objectives",
      quadrantColor: "#ff1744",
      qRefColor: "red",
      quadrantPosition: "bottom",
      basePosition: "bottom",
      updatedPosition: "",
      quadrantListItems: [
        {
          rowName:
            "Expand digital banking services to capture a younger demographic",
          rowId: "15452c25-4379-40ff-8372-4a9e5a5f0110",
          rowType: "quandrantRow",
          sortOrder: "1",
          category: CATEGORY_THREE,
        },
        {
          rowName:
            "Increase overall customer satisfaction by 15% over the next 5 years",
          rowId: "61f1b1b8-bd02-4d8c-b84e-d857abc67c6b",
          rowType: "quandrantRow",
          sortOrder: "2",
          highlight: HIGHLIGHT_COLOR_OBJ_PURPLE,
          highlightEnabled: false,
          category: CATEGORY_TWO,
        },
        {
          rowName: "Become the leading bank in mortgage lending in the region",
          rowId: "6bc145af-94c0-42a5-b8ea-02186a18f0c2",
          rowType: "quandrantRow",
          sortOrder: "3",
          category: CATEGORY_ONE,
        },
        {
          rowName: "Grow the bank's investment management services",
          rowId: "e6fa4c1d-5d35-49b0-b47d-b14e0e3b91a6",
          rowType: "quandrantRow",
          sortOrder: "4",
          category: CATEGORY_TWO,
        },
      ],
    },
    {
      quadrantName: "Annual Objectives",
      quadrantColor: "#01c666",
      qRefColor: "lightGreen",
      quadrantPosition: "left",
      basePosition: "left",
      updatedPosition: "",
      quadrantListItems: [
        {
          rowName: "Increase assets under management by 15%",
          rowId: "b91e9381-5906-470a-a9a5-fc511d93051d",
          rowType: "quandrantRow",
          sortOrder: "1",
          category: CATEGORY_ONE,
          intersections: [
            { type: "RL", rowId: "6bc145af-94c0-42a5-b8ea-02186a18f0c2" },
          ],
        },
        {
          rowName: "Increase assets under management by 25%",
          rowId: "30b36167-c020-4c71-9405-9e5a725b66ae",
          rowType: "quandrantRow",
          sortOrder: "2",
          category: CATEGORY_FOUR,
          intersections: [
            { type: "RL", rowId: "61f1b1b8-bd02-4d8c-b84e-d857abc67c6b" },
          ],
        },
        {
          rowName: "Improve Customer service rating by 6% this year",
          rowId: "d05b037e-8e27-4c27-b8c9-1110833b0fc7",
          rowType: "quandrantRow",
          sortOrder: "3",
          category: CATEGORY_TWO,
          intersections: [
            { type: "RL", rowId: "15452c25-4379-40ff-8372-4a9e5a5f0110" },
            { type: "RL", rowId: "e6fa4c1d-5d35-49b0-b47d-b14e0e3b91a6" },
          ],
        },
        {
          rowName: "Launch a new mobile banking app this year",
          rowId: "61b0afcc-0530-4c10-8a0d-75fc504e2b7f",
          rowType: "quandrantRow",
          sortOrder: "4",
          category: CATEGORY_THREE,
          intersections: [
            { type: "RL", rowId: "15452c25-4379-40ff-8372-4a9e5a5f0110" },
          ],
        },
      ],
    },
  ],
};

export { QUADRANTS_CONSTANT, ALL_CATEGORIES };
