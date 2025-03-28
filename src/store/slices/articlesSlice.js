import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
    name: 'articles',
    initialState: [
        {
            id: '1',
            title: 'The Art of Business Communication: Negotiation and Conversation Skills',
            description:
                'Effective business communication is crucial for success in any professional environment. Negotiation is a key aspect of this art, requiring not only clarity of thought but also the ability to listen actively and respond thoughtfully. Start by preparing thoroughly; understand your objectives and anticipate the other party\'s needs. \n\n Use open-ended questions to foster dialogue, and practice empathy to build rapport. During conversations, maintain eye contact and be mindful of body language, as these non-verbal cues can significantly impact the interaction. Remember, the goal is not just to win but to reach a mutually beneficial agreement. \n\n By honing your negotiation and conversational skills, you can enhance your professional relationships and drive better outcomes.',
            image: require('../../assets/articles/TheArt.png'),
        },
        {
            id: '2',
            title: 'Networking and Connections: Tips for Building Valuable Relationships',
            description:
                'Networking is essential for career growth and professional development. Building a strong network involves more than just exchanging business cards; it requires genuine relationship-building. Start by identifying your goals: what do you hope to achieve through networking? Attend industry events, join professional organizations, and leverage social media platforms like LinkedIn to connect with others in your field. \n\n When meeting new people, focus on quality over quantity; aim to establish meaningful connections rather than collecting contacts. Follow up after meetings with a personalized message to reinforce the relationship. Remember, networking is a two-way street; offer assistance and support to others, which will encourage reciprocity and strengthen your network.',
            image: require('../../assets/articles/Networking.png'),
        },
        {
            id: '3',
            title: 'Corporate Etiquette: Rules for Communication in the Business Environment',
            description:
                'Corporate Etiquette plays a vital role in maintaining professionalism within the workplace. Understanding the rules of communication can enhance your reputation and foster positive relationships with colleagues and clients. Start by being punctual; arriving on time shows respect for others’ schedules. \n\n Use appropriate language—avoid slang in formal settings and be mindful of cultural differences. Always address colleagues by their titles unless invited to do otherwise. When emailing, maintain a professional tone, and proofread for errors before sending. Additionally, practice active listening during meetings; it demonstrates respect for others\' opinions and encourages open dialogue. By adhering to corporate etiquette, you contribute to a positive work environment.',
            image: require('../../assets/articles/CorporateEtiquette.png'),
        },
        {
            id: '4',
            title: 'Public Speaking Mastery: How to Speak Confidently at Meetings and Presentations',
            description:
                'Public speaking is an invaluable skill in the business world. To speak confidently during meetings and presentations, start by preparing thoroughly; know your material inside out. Practice your delivery multiple times to become comfortable with your content. \n\n Focus on your body language—stand tall, make eye contact, and use gestures to emphasize points. Begin with a strong opening to capture your audience\'s attention, and structure your presentation clearly with an introduction, main points, and conclusion. Anticipate questions and prepare responses to demonstrate your expertise. Finally, embrace nervousness as a natural part of public speaking; channel that energy into enthusiasm for your topic.',
            image: require('../../assets/articles/PublicSpeaking.png'),
        },
        {
            id: '5',
            title: 'The Psychology of Communication: Building Trust and Effective Interaction',
            description:
                'Understanding the psychology of communication is key to building trust and fostering effective interactions in business settings. Start by practicing active listening; show genuine interest in what others are saying by asking clarifying questions and paraphrasing their points. Non-verbal communication also plays a crucial role—maintain open body language and appropriate eye contact to convey sincerity. \n\n Establishing common ground can help build rapport; find shared interests or experiences to create a connection. Additionally, be transparent in your communication; honesty fosters trust and encourages open dialogue. By applying these psychological principles, you can enhance your interpersonal skills and create stronger professional relationships.',
            image: require('../../assets/articles/ThePsychology.png'),
        },
    ],
    reducers: {},
});

export default articlesSlice.reducer;
