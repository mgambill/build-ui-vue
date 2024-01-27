import type { PathwayTemplate } from "@/stores/editor"

const dataset: PathwayTemplate = {
  "id": "2a8bdcba-3df0-4d39-9b4f-0c0690171ad2",
  "title": "Controls Example",
  "definition": "fd8e59ff-6060-4b42-932d-734b84baf510",
  "steps": [
    //  {
    //     "id": "be73784e-c51a-4256-a2a0-d7533fc65f20",
    //     "title": "Initiation",
    //     "fields": [
    //       {
    //         "id": "cf613a38-6547-4bd7-b621-acb70beafff1",
    //         "controlId": 1126,
    //         "label": {
    //           "text": "Client identifies adult learning need(s)."
    //         },
    //         "attrs": {}
    //       }
    //     ],
    //     "pathways": []
    //   },
    //   {
    //     "id": "8c7b03b0-2cea-4264-b001-ea859ce4fbc9",
    //     "title": "Step 1",
    //     "fields": [
    //       {
    //         "id": "5d009283-faad-43bb-9360-b38ba1215fa7",
    //         "controlId": 1124,
    //         "label": {
    //           "text": "Partner with client to establish and review educational and/or career goals. Document goal(s) and desired outcome(s)."
    //         },
    //         "attrs": {}
    //       },
    //       {
    //         "id": "da205c59-271b-411e-8182-621689ac5e24",
    //         "controlId": 1106,
    //         "label": {
    //           "text": "New Field"
    //         }
    //       }
    //     ],
    //     "pathways": []
    //   },
    {
      "id": "3e286945-07a5-46fa-be0c-1965bb98d93e",
      "title": "Step 2",
      "fields": [
        { "id": "da8b802d-b1e9-4090-ae75-5c0320885d35", "controlId": 1107, "label": { "text": "LabelField" } },
        { "id": "55fe7a4b-6ee1-48e9-a242-70b334bd49d3", "controlId": 1150, "label": { "text": "ContentField" }, content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quo accusamus cupiditate, voluptate repellendus, reiciendis veritatis laboriosam cum laborum maxime quasi qui inventore animi laudantium a! Excepturi aliquid dolores repellendus." },
        { "id": "c317af0a-040f-4579-9ecb-6a6df9a96957", "controlId": 1152, "label": { "text": "HeadingField" } },
        {
          "id": "d15d5d65-248f-4d3b-900f-e9ccf8863b76",
          "controlId": 1105,
          "label": {
            "text": "Client identifies adult learning need(s)."
          },
          "attrs": {},
          "options": [
            {
              "value": "c28df1f2-6165-4707-8d3b-fbde965e226a",
              "label": "Gather necessary documentation for registration."
            },
            {
              "value": "dd8c29ee-6b60-4fb6-8f6d-5ae3dae2dbad",
              "label": "Determine if client needs to take an assessment or placement exam & schedule exam date."
            },
            {
              "value": "c08ccdb2-b6a3-4210-8273-4fdea63bfc94",
              "label": "Use Education Pathways as appropriate."
            }
          ]
        }
      ],
      "pathways": []
    },
    {
      "id": "6f41475d-58e2-49c3-a28c-a3306241fd58",
      "title": "Step 3",
      "fields": [
        {
          "id": "8c7273dd-aee9-489b-b879-73aa4d0670bb",
          "controlId": 1126,
          "label": {
            "text": "Confirm that client is registered in class or training program and attends first class."
          },
          "attrs": {}
        },

        { "id": "7f73f2c0-5992-40b5-8b66-5d3fa82364e4", "controlId": 1124, "label": { "text": "ParagraphField" }, content: "lorem ipsum text" },
        { "id": "55387295-6347-4119-984b-15d8808c57d2", "controlId": 1161, "label": { "text": "PasswordField" } },
        { "id": "31ee1eb2-618a-42e6-9878-c5aa24aa7766", "controlId": 1162, "label": { "text": "DividerField" } },
        { "id": "8fec7806-7e73-437a-a13c-b3b31839cd93", "controlId": 1140, "label": { "text": "TimeField" } },
        { "id": "0cb33175-be7c-4849-9b17-7e4267a5306c", "controlId": 1158, "label": { "text": "RatingField" } },
        { "id": "ff7914b2-d050-4faf-baa3-2841b6e6a6b1", "controlId": 1160, "label": { "text": "DateTimeField" } },
        { "id": "20aa0cab-45a0-41f9-a94a-d8a06236c058", "controlId": 1114, "label": { "text": "ScaleFieldList" } },
        {
          "id": "b7ed7716-6f0a-4c9f-92d2-9b7cb38999b0", "controlId": 1116, "label": { "text": "MultiFieldSelect" }, "options": [
            {
              "value": "c28df1f2-6165-4707-8d3b-fbde965e226a",
              "label": "Gather necessary documentation for registration."
            },
            {
              "value": "dd8c29ee-6b60-4fb6-8f6d-5ae3dae2dbad",
              "label": "Determine if client needs to take an assessment or placement exam & schedule exam date."
            },
            {
              "value": "c08ccdb2-b6a3-4210-8273-4fdea63bfc94",
              "label": "Use Education Pathways as appropriate."
            }
          ]
        },
        {
          "id": "8e93912f-548b-4e20-857b-7cd98fc84aaa", "controlId": 1117, "label": { "text": "LiveFieldSearch" }, "options": [
            {
              "value": "c28df1f2-6165-4707-8d3b-fbde965e226a",
              "label": "Gather necessary documentation for registration."
            },
            {
              "value": "dd8c29ee-6b60-4fb6-8f6d-5ae3dae2dbad",
              "label": "Determine if client needs to take an assessment or placement exam & schedule exam date."
            },
            {
              "value": "c08ccdb2-b6a3-4210-8273-4fdea63bfc94",
              "label": "Use Education Pathways as appropriate."
            }
          ]
        },
        {
          "id": "d6232dcc-2694-4dd7-81c5-01b5fc072ea9", "controlId": 1103, "label": { "text": "DropdownField" }, "options": [
            {
              "value": "c28df1f2-6165-4707-8d3b-fbde965e226a",
              "label": "Gather necessary documentation for registration."
            },
            {
              "value": "dd8c29ee-6b60-4fb6-8f6d-5ae3dae2dbad",
              "label": "Determine if client needs to take an assessment or placement exam & schedule exam date."
            },
            {
              "value": "c08ccdb2-b6a3-4210-8273-4fdea63bfc94",
              "label": "Use Education Pathways as appropriate."
            }
          ]
        },
        { "id": "56f7498f-fab7-4e77-86a6-8537f9bca441", "controlId": 1101, "label": { "text": "YesFieldNoField" } },
        { "id": "dd628cd0-1be1-4459-b152-99dcb58310b6", "controlId": 1165, "label": { "text": "ConsentField" } },
        {
          "id": "725cdfeb-4870-4b70-bf82-ac4a735452ff", "controlId": 1166, "label": { "text": "PanelField" },
          "fields": [
            {
              "id": "987909ac-35f7-4b0a-b1a6-c0f2a7a8fce7",
              "controlId": 1106,
              "label": {
                "text": "Comment"
              },
              "attrs": {}
            },
            {
              "id": "8d0efb88-eacf-4da2-a96a-fea5331b2c2c",
              "controlId": 1126,
              "label": {
                "text": "Date"
              },
              "attrs": {}
            }
          ]
        },
        {
          "id": "3aad051a-82c7-4a33-ad8b-1f2a2805ac12", "controlId": 1167, "label": { "text": "RepeaterField" }, "fields": [
            {
              "id": "987909ac-35f7-4b0a-b1a6-c0f2a7a8fce7",
              "controlId": 1106,
              "label": {
                "text": "Comment"
              },
              "attrs": {}
            },
            {
              "id": "8d0efb88-eacf-4da2-a96a-fea5331b2c2c",
              "controlId": 1126,
              "label": {
                "text": "Date"
              },
              "attrs": {}
            }
          ]
        },
        { "id": "19af5237-353f-4db6-aa41-02f3199878c6", "controlId": 1168, "label": { "text": "RowField" } },
        { "id": "cf9e40bc-5b2f-4475-9c0f-52edb781be68", "controlId": 1169, "label": { "text": "AddressField" } },
        { "id": "fed0c10f-8d9f-4c8e-97be-c68faa76acf2", "controlId": 1170, "label": { "text": "ButtonField" } },
        { "id": "4a78f43a-6f41-4c56-a815-37da421ceb2d", "controlId": 2000, "label": { "text": "ContainerField" } },
        { "id": "77bfd00d-fe67-46ba-911e-bafa5c1c10c0", "controlId": 2001, "label": { "text": "GridField" } },
        { "id": "e9c99119-f3e1-470d-8165-83905681b8f1", "controlId": 3100, "label": { "text": "MarkdownField" } },
      ],




      "pathways": []
    },
    //   {
    //     "id": "38cdec9f-78e8-4c88-877e-0b94daed3a8b",
    //     "title": "Step 4",
    //     "fields": [
    //       {
    //         "id": "31b8439f-1f04-48b4-9cf1-6d638a7e3cec",
    //         "controlId": 1167,
    //         "label": {
    //           "text": "Monitor client’s progress with educational program. At a minimum of every 2 weeks confirm that client is attending classes and document progress in client record."
    //         },
    //         "fields": [
    //           {
    //             "id": "987909ac-35f7-4b0a-b1a6-c0f2a7a8fce7",
    //             "controlId": 1106,
    //             "label": {
    //               "text": "Comment"
    //             },
    //             "attrs": {}
    //           },
    //           {
    //             "id": "8d0efb88-eacf-4da2-a96a-fea5331b2c2c",
    //             "controlId": 1126,
    //             "label": {
    //               "text": "Date"
    //             },
    //             "attrs": {}
    //           }
    //         ],
    //         "attrs": {}
    //       }
    //     ],
    //     "pathways": []
    //   },
    {
      "id": "364a8c45-965c-41c3-a2f4-4a16620caf19",
      "title": "Completion",
      "fields": [
        {
          "id": "073287ad-3116-4652-ac0f-06935ec212cd",
          "controlId": 1104,
          "label": {
            "text": "Confirm that client successfully completes stated educational goal:"
          },
          "attrs": {
            "foo": "bar"
          },
          "options": [
            {
              "id": "122ceb45-649c-4473-bf52-7a8084520699",
              "value": "isCompleted",
              "label": "Course / class completed."
            },
            {
              "id": "9c407490-1513-46cf-abdf-e313d93f6aea",
              "value": "trainingCompleted",
              "label": "Training program completed."
            },
            {
              "id": "e7f28746-7846-4411-a2d0-f74ca1dbdb22",
              "value": "semesterCompleted",
              "label": "Quarter / semester completed."
            }
          ],
          "property": "MyProperty"
        },
        {
          "id": "7d4da5e9-afb2-4f89-8e98-d0cf03d9343c",
          "controlId": 1126,
          "label": {
            "text": "Date:"
          },
          "attrs": {}
        }
      ],
      "pathways": []
    }
  ]
}

export default dataset
