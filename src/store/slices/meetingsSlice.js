import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeTab: 'Active',
    filterDate: null,
    searchQuery: '',
    closestData: [],
    allContactsData: [],
    contacts: [],
    contactTags: ['Friend', 'Cusine', 'Best friend', 'Colleague']
};

const meetingsSlice = createSlice({
    name: 'meetings',
    initialState,
    reducers: {
        setActiveTab(state, action) {
            state.activeTab = action.payload;
        },
        setFilterDate(state, action) {
            state.filterDate = action.payload;
        },
        clearFilterDate(state) {
            state.filterDate = null;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        clearSearchQuery(state) {
            state.searchQuery = '';
        },
        setClosestData(state, action) {
            state.closestData = action.payload;
        },
        setAllContactsData(state, action) {
            state.allContactsData = action.payload;
        },
        deleteMeeting(state, action) {
            const id = action.payload;
            state.allContactsData = state.allContactsData.filter(item => item.id !== id);
        },
        deleteContact(state, action) {
            const id = action.payload;
            state.contacts = state.contacts.filter(contact => contact.id !== id);
        },
        addMeeting(state, action) {
            state.allContactsData = [action.payload, ...state.allContactsData];
        },
        updateMeeting(state, action) {
            const updatedMeeting = action.payload;
            const index = state.allContactsData.findIndex(m => m.id === updatedMeeting.id);
            if (index !== -1) {
                state.allContactsData[index] = updatedMeeting;
            }
        },
        addContact(state, action) {
            state.contacts.push(action.payload);
            action.payload.tags.forEach(tag => {
                if (!state.contactTags.includes(tag)) {
                    state.contactTags.push(tag);
                }
            });
        },
        updateContact(state, action) {
            const updatedContact = action.payload;
            const index = state.contacts.findIndex(contact => contact.id === updatedContact.id);
            if (index !== -1) {
                state.contacts[index] = {
                    ...state.contacts[index],
                    ...updatedContact,
                };
            }
        }
    }
});

export const {
    setActiveTab,
    setFilterDate,
    clearFilterDate,
    setSearchQuery,
    clearSearchQuery,
    setClosestData,
    setAllContactsData,
    addMeeting,
    deleteMeeting,
    deleteContact,
    updateMeeting,
    addContact,
    updateContact
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
