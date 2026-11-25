
IF DB_ID('Kanban') IS NULL
BEGIN
    CREATE DATABASE Kanban;
END
GO

USE Kanban;
GO

-- Features
IF OBJECT_ID('dbo.Features', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Features
    (
        FeatureID INT IDENTITY(1,1) PRIMARY KEY,
        Title NVARCHAR(200) NOT NULL,
        Description NVARCHAR(MAX) NULL
    );
END
GO

-- States
IF OBJECT_ID('dbo.States', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.States
    (
        StateID INT PRIMARY KEY,
        Name NVARCHAR(50) NOT NULL UNIQUE
    );
END
GO

-- Priorities
IF OBJECT_ID('dbo.Priorities', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Priorities
    (
        PriorityID INT PRIMARY KEY,
        Name NVARCHAR(50) NOT NULL UNIQUE
    );
END
GO

-- Users
IF OBJECT_ID('dbo.Users', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Users
    (
        UserID INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
        AccessLevel INT NOT NULL DEFAULT 0
    );
END
GO

-- User stories and bugs
IF OBJECT_ID('dbo.WorkItems', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.WorkItems
    (
        WorkItemID INT IDENTITY(1,1) PRIMARY KEY,
        FeatureID INT NULL,
        Title NVARCHAR(200) NOT NULL,
        Description NVARCHAR(MAX) NULL,
        StateID INT NOT NULL DEFAULT 1,
        PriorityID INT NOT NULL DEFAULT 3,
        Type NVARCHAR(20) NOT NULL,
        EstimatedTime INT NULL,
        UserNote NVARCHAR(MAX) NULL,
        ParentWorkItemID INT NULL,
        OwnerID INT NULL,
        SprintDone INT NULL,

        FOREIGN KEY (FeatureID)
            REFERENCES dbo.Features(FeatureID),

        FOREIGN KEY (StateID)
            REFERENCES dbo.States(StateID),

        FOREIGN KEY (PriorityID)
            REFERENCES dbo.Priorities(PriorityID),

        FOREIGN KEY (ParentWorkItemID)
            REFERENCES dbo.WorkItems(WorkItemID),

        FOREIGN KEY (OwnerID)
            REFERENCES dbo.Users(UserID),

        CHECK (Type IN ('UserStory', 'Bug'))
    );
END
GO

-- Tasks
IF OBJECT_ID('dbo.Tasks', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Tasks
    (
        TaskID INT IDENTITY(1,1) PRIMARY KEY,
        WorkItemID INT NOT NULL,
        Title NVARCHAR(200) NOT NULL,
        Done BIT NOT NULL DEFAULT 0,

        FOREIGN KEY (WorkItemID)
            REFERENCES dbo.WorkItems(WorkItemID)
            ON DELETE CASCADE
    );
END
GO


-- Seed states
INSERT INTO dbo.States (StateID, Name)
SELECT v.StateID, v.Name
FROM (VALUES
    (1, 'Backlog'),
    (2, 'ToDo'),
    (3, 'InProgress'),
    (4, 'QaTests'),
    (5, 'Done')
) AS v(StateID, Name)
WHERE NOT EXISTS
(
    SELECT 1
    FROM dbo.States s
    WHERE s.StateID = v.StateID
);
GO

-- Seed priorities
INSERT INTO dbo.Priorities (PriorityID, Name)
SELECT v.PriorityID, v.Name
FROM (VALUES
    (1, 'Essential'),
    (2, 'High'),
    (3, 'Medium'),
    (4, 'Low')
) AS v(PriorityID, Name)
WHERE NOT EXISTS
(
    SELECT 1
    FROM dbo.Priorities p
    WHERE p.PriorityID = v.PriorityID
);
GO
