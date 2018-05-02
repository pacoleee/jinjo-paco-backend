CREATE TABLE Question
	(questionID		int auto_increment,
	 question 		varchar(65535),
	 upvotes		int,
	 roomID			varchar(100),
	 isAnswered		boolean,
	 PRIMARY KEY (questionID), 
	 FOREIGN KEY REFERENCES Room (roomID),
	 ON UPDATE CASCADE,
	 ON DELETE CASCADE);

alter table question auto_increment = 1000;