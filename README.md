Developer Quest
===============

## A 16-Bit JRPG-Style Game ##

# Idea

In talking with @ryoe and others, I think it would be great fun to create some sort of video game. Being the age that I am and NES/SNES being a big part of my childhood, a 16-bit JRPG style game might be cool.

# Design Goals

* Humor - game should be funny but not hurtful - that’s a fine line to walk

* 16-bit graphics (think SNES) 

* JRPG-style (think US release of Final Fantasy III)

# Setting/Story

* Act 1

    * Scene 1

        * Set sometime in the 1990’s

        * Generic company creating hardware and software

        * Large corporate highrise

        * Start as character X

        * Funny intro doing work related to character’s job function

        * Unknown explosion shakes building and power goes out (all is dark except for eyes)

        * Character fumbles around and finds light source (glow effect)

        * Search around to find breaker box

        * At one point sees shadowy figure run by outskirts of light source

        * Keep going

        * Later second character turns on his/her light source and scares first character

        * Second character joins party and continue to search for light source

        * Eventually find breaker box (perhaps on the next floor down) and turn lights back on, revealing damage to the building

    * Scene 2

        * Party decides to go down to bottom floor to escape the building

        * Damage gets worse as they go down

        * Attacked by artificial intelligence

        * AI was secretly created by the company for which they work

        * One of the main characters has secretly created this software by stealing and modifying the software of the main character. At some point in the game, he switches sides after learning this, and becomes the primary antagonist and final boss.

        * AI was instructed by the board of directors to protect the company,and when first-quarter margins were significantly lower than expected, it decided to "protect" the company by replacing all of the employees with robots.

        * AI starts secretly replacing employees from bottom floors up. One human (Mad Scientist) in the middle of the tower discovers this secret, and ends up setting off a bomb in an attempt to prevent the AI from spreading from beyond the building.

        * Upon reaching the middle part of the building, Duke learns that the AI is his own software. One of the robots says, "Duke, I am your software". To which Duke replies, "That's not true; that's impossible!" Then he jumps down the empty part of the bombed out building. He survives, but the others do not know that until later.

        * The bomb severely damages the middle floors of the building, leaving only one (or perhaps two) ways to escape the building.

        * One such way is to meet up with Carl the Executive, and find out that he helped green light the AI project. He knows of a location to his Executive Washroom key. The washroom contains a separate express elevator. (Foreshadowing - make one of the other characters comment on how the executives arrive at work at the same time, but get to the upper floors faster than normal employees)

        * A security locker exists on the first floor with projectile weapons. These can be used by the Security Guard.

# Inspiration/Ideas

* Final Fantasy IV

* Penny Arcade’s On The Rain-Slick Precipice of Darkness

* Character introduction screens like in Borderlands franchise

# Engine

In general, making these types of games is a solved problem, so we could just use one of the following existing engines and script out the game.

* [RPG Maker](http://www.rpgmakerweb.com/)

* [ImpactJS](http://impactjs.com/)

# Title Ideas

* Developer Quest

# Characters

* Duke - Rockstar, main character, weapon: mechanical keyboard (for hacking)

* Claribel - Another developer, Duke’s love interest, weapon: mouse (as whip)

* Lazlo - Graphic Designer, weapon: pen tablet

* Carl - Executive

# Morale System

For all but basic attacks, a character must have a certain level of morale in order to take an action. Many actions in the game, from both friend and foe, are designed to increase the morale of allies (defensive) or decrease the morale of enemies (offensive). In particular, the Sunshine-Pumper and Doomsayer hats contains actions related to increasing and decreasing morale, respectively.

# Artifacts

Artifacts are items that, when equipped, change the actions that you can perform. Some of these may be only available to enemies, or unlockable through achievements.

* Dev

* Neckbeard

* Doomsayer

    * Demotivator

    * Noisy Minority

    * Rage Quit (powerful attack and then leave for the rest of the encounter)

* Sunshine-Pumper

    * Motivational Poster

    * Go Team!

    * It’s not a problem; it’s an opportunity.

* Manager

    * Chain Of Command (slow)

    * Incomplete Specification (confusion)

    * Everything is High Priority (speed)

    * Impossible Deadline (speed)

    * Unproductive Meeting (summon a living meeting to attack enemies)

    * Level 1 - Outsource

        * Replace an ally’s turn with an outsourced NPC for X turns. The NPC will perform a random action that is beneficial to the PCs.

    * Level 2 - Downsize

        * Like Level 1, but replaces the ally’s turn for the rest of the encounter. Also more powerful.

* Executive

    * Replace existing powers

        * Level 1 - Strategic Decision 

            * replaces existing in-house software (actions?) with purchased third-party software (actions?)

        * Level 2 - Merger

            * More powerful version of Level 1

        * Level 3 - Acquisition

            * More powerful version of level 2; adds new powers instead of replacing existing ones

    * Repeating External Actions

        * Level 1 - I Know a Guy

            * Consultant attacks once per round

            * Decreases morale by X once per round

        * Level 2 - Bring in the Consultants

            * More powerful version of Level 1

    * Inspection

        * Level 1 - Business Intelligence

            * Learn basic info about an enemy

        * Level 2 - Corporate Espionage?

            * Learn more info about an enemy

    * Controller

        * Level 1 - Hostile takeover

            * Take control of an enemy for a limited time

    * Old Boys Club

* Luddite

    * The Old Version Was Better (rage)

    * Who Moved My Cheese? (rage)

    * Archaic Lore (sleep)

* Rockstar - Locked to Duke

    * Object Graph of Imprisonment

    * Building Frameworks in the Sky

* Code Ninja

* Build-Breaker

    * Midnight Coder (what codes at midnight)

    * Tech-Debt Tsunami

* Graphic Designer - Locked to Lazlo

    * FOUC (flash of unstyled content)

* Mad Scientist

    * Go Pound Sand

* Fanboy

* Cowboy

* Project Management

* Dev Ops

* QA

* Controller

    * Long ROI

    * Hiring freeze

# Enemies

* Grumpalump

    * Toxic complaints

* Quiet one - make him made and he'll set the building on fire (Milton)

    * Molotov

# Items

* Yellow dry erase marker - an item never touched by a human hand, able to write invisible messages

* Key to executive washroom - allows access to lower levels of the building (executive washroom contains a separate elevator not damaged by early game events)

* Ivory backscratcher

* Programmer’s Razor

    * The most complicated, arcane, and difficult to understand solution is usually the one that was chosen by your predecessors.

# Dungeons

* The three staging servers of doom!

    * development, beta, and production

* The Land of Outsourcing

