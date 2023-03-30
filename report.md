
# Explain and defend your implementation of HATEOAS in your solution.

I have decided to create a baseLinks collection where the user will get necessary links to the API when entering the base of the API. These links are also presented in all other responses in the API because they can be handy regardless of what request you make in the API. This baseLinks includes the following:
* link to collection of all movies.
* link to create a new movie.
* link to login a user
* link to register a user

Furthermore, I have decided to create only one link to a specific resource in the response when a client is fetching all of the movies, this is done to minimize the amount of links of each resource. If a user wants to have more information about what they can do with a specific movie in the API they need to request a specific movie in order to get information about that.
link to a specific movie is provided for each movie
In addition, when a user is requesting a specific movie they will receive a list of multiple actions they can do with this resource in the response, this includes the following:
* link to the specific movie is provided
* link to update some part of the specific movie
* link to update all parts in the specific movie
* link to delete the specific movie
When a user deletes, updates or creates a resource(movie) a message will be sent with the response that it was succeeded, the baselinks is also provided in this response.


All of the links includes the following:
* rel, this is a relation between two resources in the API.
* method, this is the method the user should use when making a request.
* href, this is the link
	
Some of the links also includes:
* description, this is a short description about the request they can do with the link.

# If your solution should implement multiple representations of the resources. How would you do it?
I have only implemented representation in JSON format, but another format available is XML. In order to make representation of the resources in XML I have to learn XML, this could be done with documentation and other sources. 

In addition, If a client wants to send XML data to the APIand wants the API to respond with XML, they need to add either "application/xml" or "text/xml" to the "Content-Type" property in the request header. The API needs to listen to the "Content-Type" property in order to determine whether the data is in JSON or XML format. This is necessary because XML and JSON have different structures and rules and the API needs to use different methods to handle the two formats in order to send back the right data and format.



# Motivate and defend your authentication solution. 3a. What other authentication solutions could you implement? 3b. What are the pros/cons of this solution?

### 3: 

The user must login in with username and password, the password is encrypted in the database by a one-way hash function, this means that it’s almost impossible to decrypt the password. In other words this makes it hard for attackers towards the API to crack the password. The API also has a JWT for added security to authorize users, this is not a silverbullet but combined with a hashed password the security is generally good.
### 3a:

I could also implement a double factoring authentication, for now it’s only a one factor authentication with username and password. To get a higher security another factor could be added, for example “something you know”-factor could be added when creating a user, this could be a pin code the user needs to write when they login combined with username and password.


### 3b: Write about pros/cons on the api right now regarding the authentication

#### Pros:
Hashing the password makes it almost impossible for attackers to crack the password.
Using JWT for authorization adds an extra layer to the authentication process, this makes it more difficult for attackers to authorize when they should not be authorized.
#### Cons:
A one factor authentication is not recommended, two factor authentication is recommended in order to get a higher security. 
Anyone can for now register and add stuff to the database, another check in some sort could be added so the API isn’t open for everyone to update, delete and add stuff to the API after they have registered. This could be done by whitelisting the IP-addresses of the particular persons that should have access to the API.


# Explain how your webhook works.

The first step is for the user to add a URL to the API in order to get a response with the resource that has been created, this is done by a POST request that will save the URL in the database.

The second step is to create a movie with a user, if the movie is created the webhook will be triggered, when the webhook is triggered all of the URL:s that are saved in the database will get a notification with the new movie that just have been created.



# Since this is your first own web API, there are probably things you would solve in another way, looking back at this assignment. Write your thoughts about this.

I could look more at other API:s structures to get a hint of how they should be built, but overall I think my API is okay.


# Which "linguistic design rules" have you implemented? List them here and motivate "for each" of them very briefly why did you choose them? Remember that you must consider "at least" FIVE "linguistic design rules" as the linguistic quality of your API.


* Underscores (_) should not be used in URIs.<br>
I decided to not use underscores in URI:s, on some web servers an underscore may be seen as a space, therefore I think it’s a good idea to avoid them.


* Lowercase letters should be preferred in URI paths <br>
I have only used lowercase letters, because some uppercase letters can be seen as other letters. For example a lowercase L can be seen as a big i.


* CRUD function names or their synonyms should not be used in URIs.<br>
I decided to not use function names or their synonyms in the URIs because it can lead to confusion in the API.

* A trailing forward slash (/) should not be included in URIs<br>
This is because the API should be clear, a “/” in the end could add some confusion.

* File extensions should not be included in URIs.<br>
It’s a bad practice to use file extensions, it can lead to confusion and inconsistency.

# Did you do something extra besides the fundamental requirements? Explain them.
I didn't do anything extra in this assignment.
