import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDocument, IUser } from "../../types/Types";

interface IDocumentsToSendState {
  data: IDocument[];
}

interface IDocumentsToSendPayload {
  docToSend: IDocument;
}

interface IDeleteDocumentsToSendPayload {
  docToSendId: string;
}

const documentsToSendSlice = createSlice({
  name: "documentsToSendSlice",
  initialState: <IDocumentsToSendState>{
    data: [],
  },
  reducers: {
    addDocumentToSend: (state, action: PayloadAction<IDocumentsToSendPayload>) => {
      const { docToSend } = action.payload;
      state.data.push(docToSend);
    },
    deleteDocumentToSend: (state, action: PayloadAction<IDeleteDocumentsToSendPayload>) => {
      const { docToSendId } = action.payload;
      // state.data = state.data.filter((docIdToSend) => {
      //   if (docIdToSend.id !== docToSendId) {
      //     return docIdToSend;
      //   }
      // });

      state.data = state.data.filter((docIdToSend) => docIdToSend.id !== docToSendId && docIdToSend);
    },
    deleteAllDocumentsToSend: (state) => {
      state.data = [];
    },
  },
});

export const { addDocumentToSend, deleteDocumentToSend, deleteAllDocumentsToSend } = documentsToSendSlice.actions;

export const getAllDocumentsToSend = (state: { documentsToSend: IDocumentsToSendState }) => state.documentsToSend.data;

export default documentsToSendSlice.reducer;
