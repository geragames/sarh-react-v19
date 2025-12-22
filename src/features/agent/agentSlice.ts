import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AgentWithId } from "../../models/agent.d";
import { fetchAgents, fetchAgentById, addAgent, updateAgent } from "./agentThunk";

interface AgentState {
  agents: AgentWithId[];
  agent: AgentWithId | null;
  selectedAgent: AgentWithId | null;
  loading: boolean;
  error: string | null;
}

const initialState: AgentState = {
  agents: [],
  agent: null,
  selectedAgent: null,
  loading: false,
  error: null,
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    clearSelectedAgent: (state) => {
      state.selectedAgent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAgents.fulfilled,
        (state, action: PayloadAction<AgentWithId[]>) => {
          state.loading = false;
          state.agents = action.payload;
        }
      )
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAgentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAgentById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.agent = action.payload;
        }       
      )
      .addCase(fetchAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addAgent.fulfilled,
        (state, action: PayloadAction<AgentWithId>) => {
          state.loading = false;
          state.agents.push(action.payload);
        }
      )
      .addCase(addAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAgent.fulfilled,
        (state, action: PayloadAction<AgentWithId>) => {
          state.loading = false;
          const index = state.agents.findIndex(
            (agent) => agent.id === action.payload.id
          );
          if (index !== -1) {
            state.agents[index] = action.payload;
          }
          if (state.selectedAgent && state.selectedAgent.id === action.payload.id) {
            state.selectedAgent = action.payload;
          }
        }
      )
      .addCase(updateAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSelectedAgent } = agentSlice.actions;

export default agentSlice.reducer;

