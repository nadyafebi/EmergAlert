# EmergAlert

A digital platform that recognizes emergencies and gives immediate responses.

Winner of Athena Hacks 2018 "Best Use of Microsoft Technologies" award.

Made by:
* Nadya Djojosantoso ([@nadyafebi](https://github.com/nadyafebi))
* Diane Tobit ([@diane27](https://github.com/diane27))
* Christine Sun ([@insomnolent](https://github.com/insomnolent))
* Clara Chu ([@Clara-Chu](https://github.com/Clara-Chu))

[Link to Devpost project](https://devpost.com/software/emergalert-gq3yva)

[Link to original repositories](https://github.com/EmergAlert)

## Inspiration
Unfortunately, there has been a rise in mass-school shootings in the United States. In these incidences, many students are murdered, ruining the bright future of these youths. A member of our team members was also involved in the traumatic experience of a school shooting. We wanted to prevent or at least decrease the loss of lives caused by these shootings.

## What it does
EmergAlert takes footage from security cameras and analyzes the footage frame-by-frame for the possibility of someone possessing a gun in the school ground. If it detects a shooter EmergAlert will notify students and staffs through text message. They will be informed of the shooter's location and evacuation plan. The website also has a map indicating danger sone and a graph to represent the emotional state of the students during a shooting.

## How we built it
We built it using Microsoft's Custom Vision API that we train to recognize guns. We also use Twilio API to send and receive mass text messages. For the front-end, we use Foundation to make a responsive website with beautiful UI. We use Text Analysis API to analyze the sentiment in the text messages of the students in an emergency and displayed in a real-time graph with C3 and D3.

## Challenges we ran into
It was difficulty finalizing the idea. Additionally, it was hard for us to use the Custom Vision API due to the API being still in beta and lack of documentation on how to use it. Fortunately, the mentors helped us so we can at least deliver a minimum viable product.

## Accomplishments that we're proud of
We're proud to finally get all the APIs to work together.

## What we learned
Some members of our team are new to utilizing API and it was a great learning experience for them. Additionally, we learned more about Microsoft Cognitive Services, Twilio, and JavaScript. Finally, it was a great team experience to work in a team at our members first Hackathon.

## What's next for EmergAlert
We would like EmergAlert to have more features such as a chatbot to respond to student questions and guide them through this emergency. Additionally, we may be considering to release EmergAlert to schools to increase the safety of the students. We would consider branding to get EmergAlert to as many schools as possible.
