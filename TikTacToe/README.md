# Tic Tac Toe - Project 1

## README 

### List of Used Technologies:
* HTML
* CSS
* javascript
* jQuery

### Links to Wireframe and Brainstorm
* [Wireframe](https://miro.com/app/board/uXjVP-bGB1Q=/?share_link_id=340623196875)
* [Brainstorm](https://miro.com/app/board/uXjVP_0qxaw=/?share_link_id=617590102916)

### List of Unsolved Issues
* AI - Managed to convert the logic into a function that recommends a random box from the unselected boxes.
*  Will improve on that in the future with an engaging 'PC' player.
* I would have liked to add a 3D feel to the game, but I spent most of the time checking that the functions work.
* Time Management.

### Logic Steps:
* Player 1 & 2 enter respective names in respective input fields. these values will be reflected on the score board at the bottom or siide?
* Each player takes turns in selecting the boxes. On Each player's turn their names/side will be highlighted.
* The players' selection will input an X/O on the respective boxes, then should disable further clicks on these boxes.
* First player to achieve one of the winning sets will be winner and score will be recorded on their respective scoreboard.
* If no one achieves winning condition, it will be considered a draw and be recorded as such in the scoreboard.
* The board resets for another round. the previous steps repeat until the number of rounds is satisfied.
* After that, compare both scores to prodce a winner or a draw.

### Logic of win:

Winning conditions are a collection of arrays of box position-indecies arrangement that will satisfy the winning conditons.

#### Create the Chars 'X' & 'O':
On 'click' of each box a function will create an text/img that will fill in the box, with jQuery's .append(text/img) or .text(Char)

#### Compare Winning Conditions to player selections:
* Record player's selections in an array; for each selection will be stored in an array.
* In the comparison function: // nested for loop.
 *  Check if all three elements in an array of winning conditions are included in the player's array.
 * the function starts comparison at the 5th turn.
 *  If there is a match that player wins.
 *  If no matches, the result is draw.
* Wining side will gain a point for each win linked to their scorebox.
* Board resets
 #### Determine the overall winner :
 Compare each player's score to determine the winner, if equal then a draw.

## User Stories
* As an unnamed player, I want to enter a player name to personalise the game.
* As an unnamed player, I want to play without  entering a name, I just want to start the game.
* As a player, I want to have background music to energise the experience.
* As a player, I want to see my score to compare my results with my opponent's.
* As a player, I want to stop the background music with a click.


### Favorite Functions:
* The winCond function checks if elements in an array from the winning condition array included in a player's selecton. returns true if all three elements are included in the player's selection.
