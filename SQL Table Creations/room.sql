CREATE TABLE Room
	(roomID			int auto_increment,
	 instructorID	varchar(100),
	 roomName		varchar(100),
	 PRIMARY KEY (roomID),
	 FOREIGN KEY(instructorID) REFERENCES Instructor(instructorID),
	 ON UPDATE CASCADE);

alter table room auto_increment = 1000;