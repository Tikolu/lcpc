# Leaving Cert Point Calculator

Available to use at https://tikolu.net/lcpc.


## What is this?

If you are completely clueless, chances are you are not familiar with the Irish educational system, so here's a brief overview.

In Ireland, like in most countries, Secondary school (equivalent of US "Middle School") students have to take final exams. In Ireland, these exams are called the "Leaving Certificate".

Through a complex system of grading and calculations, your Leaving Cert results are converted into a single number, which can range from 0 to 625. This number is what most third level colleges and universities look at as an entry requirement.

There is just under 60 different subjects you can choose to do for your Leaving Cert, depending on your school. Most of these subjects have two difficulty levels; Higher and Ordinary, with 8 grades for each level.

Each level and grade contributes a different amount of points (more information  [here](https://tikolu.net/lcpc#grade-reference)), which are all added up into the single number. You can choose to do however many subjects you want, but only your best six results will count towards the total.

However, some subjects are exceptions and are calculated differently. When developing this calculator, I made sure to account for all such exceptions. Please let me know if I missed anything.

## How is this better than other calculators?

Inspiration for this project came to me when I hit "START OVER" for the 20th time on the CareersPortal calculator. Just wanting to check how much worse my result would be if I got a H3 instead of a H2 in one subject, I had to enter all of my results again.

I imagined a similar calculator, but which remembered all of your subjects, and updated in real time to show your point total, without the need to re-enter all grades every single time.

Although the Qualifax calculator does allow for changes without restarting, it is horribly non-mobile friendly, and requires a page refresh to recalculate, so it isn't really "real time".

That evening, I already had a working prototype, and the next day my calculator was mostly finished.

Here are links to the other calculators, so you can compare for yourself:

-   [CareersPortal Leaving Cert Points Calculator](https://careersportal.ie/courses/calculator/pointsCalculator.html)
-   [Qualifax Leaving Cert Points Calculator](https://www.qualifax.ie/index.php?option=com_wrapper&view=wrapper&Itemid=305)
-   [CAO Leaving Cert Points Calculator](https://www.cao.ie/?page=points_calc)
-   [CareerGuidance Leaving Cert Points Calculator](https://careerguidance.ie/leaving-cert-points-calculator.php)

This calculator works great on both desktop and mobile, mouse or touch screen. It features a modern UI with automatic dark theme.

Your subjects and grades are remembered, which means that if you ever return to this website, everything will be just as you left it.

## Technical details

All data is stored and calculated exclusively in your browser, and is at no point sent to any remote server. Subjects and grades are saved in the browser's  `LocalStorage`.

I decided to develop this project as a single HTML file, which allows you to easily download it (Ctrl+S) for offline use.

## Support me

I developed this project with no monetary goals in mind, and I would never want to charge people to use it, or put ads on it.

However, I would be absolutely delighted if you checked out some of my  [other projects](https://tikolu.net/), and if you are feeling particularly generous, you can  [donate](https://paypal.me/tikolu).

If there is anything you would like me to add or change about my calculator, or if you simply want to have a chat, don't hesitate to  [contact me](https://tikolu.net/contact).
