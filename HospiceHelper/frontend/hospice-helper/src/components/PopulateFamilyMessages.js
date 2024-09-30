import React, { useEffect } from 'react';
import axios from '../../axios';

const PopulateFamilyMessages = () => {
    const messages = [
        { from: "Lisa", to: "HospiceHelper", message: "I just gave John his medication, but he’s been very drowsy all day. Should I be worried about that?" },
        { from: "Alex", to: "HospiceHelper", message: "I’m flying in tomorrow to see dad. What should I keep in mind when I visit him? I haven’t seen him since he got worse." },
        { from: "Sophia", to: "HospiceHelper", message: "Dad hasn’t been eating much lately. Is that part of the process, or should we try harder to get him to eat?" },
        { from: "Lisa", to: "HospiceHelper", message: "John has been asleep for almost 18 hours now. Is there anything I should do, or should I let him rest?" },
        { from: "Emily", to: "HospiceHelper", message: "I’m starting to notice John having trouble recognizing me. Could this be the medication, or is it something else?" },
        { from: "Alex", to: "HospiceHelper", message: "I want to help out more when I’m in town, but it’s hard when I live so far away. Any tips on how I can support from a distance?" },
        { from: "Sophia", to: "HospiceHelper", message: "I’m so stressed with school and trying to help mom with dad. I feel like I’m failing both. How do people do this?" },
        { from: "Lisa", to: "HospiceHelper", message: "I am so overwhelmed. I’m trying to take care of John, manage the house, and still make time for myself, but it’s impossible. I just need to cry." },
        { from: "Emily", to: "HospiceHelper", message: "I can’t seem to lift John the way I used to when he needs help moving. What are the best ways to move someone safely?" },
        { from: "Sophia", to: "HospiceHelper", message: "I wish I could take more time off school to help out. I just feel guilty that I’m not here all the time." },
        { from: "Alex", to: "HospiceHelper", message: "Dad seemed to have a moment of clarity today. Is that normal when someone is so far along in hospice care?" },
        { from: "Lisa", to: "HospiceHelper", message: "John’s pain has increased, even though we’re sticking to the medication schedule. Should we adjust the dosage?" },
        { from: "Emily", to: "HospiceHelper", message: "John is coughing more lately, and it sounds congested. Could this be pneumonia?" },
        { from: "Sophia", to: "HospiceHelper", message: "I gave dad his morphine earlier, but now he’s much more out of it than usual. Is that okay?" },
        { from: "Lisa", to: "HospiceHelper", message: "John’s breathing seems very irregular tonight. Should I call the nurse, or is this something we can manage?" },
        { from: "Alex", to: "HospiceHelper", message: "Mom seems exhausted. How can we help her without overwhelming her more?" },
        { from: "Sophia", to: "HospiceHelper", message: "Dad told me he was scared today. I didn’t know what to say. How do you comfort someone in that situation?" },
        { from: "Emily", to: "HospiceHelper", message: "I just sat with John while he slept. I hope he knows how much we love him." },
        { from: "Lisa", to: "HospiceHelper", message: "I can’t believe how fast things are changing. It’s hard to keep up with everything. Should I be planning for something I’m not?" },
        { from: "Alex", to: "HospiceHelper", message: "Mom said dad’s feet are swelling again. Is that something we need to manage more closely?" },
        { from: "Sophia", to: "HospiceHelper", message: "Sometimes dad is awake and clear, but other times he seems completely out of it. Is that a side effect of his medication?" },
        { from: "Emily", to: "HospiceHelper", message: "John had another episode of confusion today. Is there a way to make him more comfortable when that happens?" },
        { from: "Lisa", to: "HospiceHelper", message: "I keep wondering if we’re doing enough. Is there more we should be doing to help John through this?" },
        { from: "Alex", to: "HospiceHelper", message: "I’m flying back home tomorrow, but I feel like I should stay longer. I hate leaving everyone behind." },
        { from: "Sophia", to: "HospiceHelper", message: "How do you know when someone is in their final days? I don’t feel ready for this." },
        { from: "Emily", to: "HospiceHelper", message: "John is getting weaker by the day, and I’m starting to feel helpless. How do we keep going like this?" },
        { from: "Lisa", to: "HospiceHelper", message: "I wish I had more time to spend with John, but the house and everything else keeps piling up." },
        { from: "Sophia", to: "HospiceHelper", message: "Mom looks so worn out. How do we help her without making her feel worse?" },
        { from: "Alex", to: "HospiceHelper", message: "Is there a way to make dad’s room more peaceful? I think he’d like more natural light." },
        { from: "Lisa", to: "HospiceHelper", message: "I just need someone to tell me I’m doing the right thing. Every day feels like a balancing act." }
    ];

    useEffect(() => {
        const populateMessages = async () => {
            try {
                for (const message of messages) {
                    await axios.post('/add-message', message);
                    console.log(`Message from ${message.from} added.`);
                }
            } catch (error) {
                console.error('Error populating messages:', error);
            }
        };

        populateMessages();
    }, []);

    return <h2>Populating family messages...</h2>; // Optional UI feedback
};

export default PopulateFamilyMessages;
