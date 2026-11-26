USE Kanban;
GO

SET XACT_ABORT ON;
BEGIN TRANSACTION;

DECLARE @Feature1 INT, @Feature2 INT, @Feature3 INT;
DECLARE @Story1 INT, @Story2 INT, @Story3 INT;
DECLARE @Story4 INT, @Story5 INT, @Story6 INT;

DECLARE @Reset_All BIT = 1; -- Set to 1 to reset all data, 0 to keep existing data

IF @Reset_All = 1
BEGIN
    DELETE FROM dbo.Tasks
    DELETE FROM dbo.WorkItems
    DELETE FROM dbo.Features
END


-- =============================================
-- Features
-- =============================================

INSERT INTO dbo.Features (Title, Description)
VALUES ('User Management', 'Manage users and authentication');

SET @Feature1 = SCOPE_IDENTITY();

INSERT INTO dbo.Features (Title, Description)
VALUES ('Kanban Board', 'Manage and display work items');

SET @Feature2 = SCOPE_IDENTITY();

INSERT INTO dbo.Features (Title, Description)
VALUES ('Sprint Management', 'Manage sprint progression');

SET @Feature3 = SCOPE_IDENTITY();

-- =============================================
-- User Stories
-- =============================================

INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID, Type, EstimatedDays)
VALUES
    (@Feature1, 'User login', 'Allow users to log in', 3, 1, 'UserStory', 3);

SET @Story1 = SCOPE_IDENTITY();

INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID, Type, EstimatedDays)
VALUES
    (@Feature1, 'User registration', 'Allow users to register', 2, 2, 'UserStory', 2);

SET @Story2 = SCOPE_IDENTITY();

INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID, Type, EstimatedDays)
VALUES
    (@Feature2, 'Display Kanban board', 'Display all work items', 4, 1, 'UserStory', 4);

SET @Story3 = SCOPE_IDENTITY();

INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID, Type, EstimatedDays)
VALUES
    (@Feature2, 'Move work items', 'Move items between states', 5, 2, 'UserStory', 2);

SET @Story4 = SCOPE_IDENTITY();

INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID, Type, EstimatedDays)
VALUES
    (@Feature3, 'Start sprint', 'Allow starting a new sprint', 1, 3, 'UserStory', 2);

SET @Story5 = SCOPE_IDENTITY();

INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID, Type, EstimatedDays)
VALUES
    (@Feature3, 'Sprint history', 'Display previous sprints', 1, 4, 'UserStory', 3);

SET @Story6 = SCOPE_IDENTITY();

-- =============================================
-- Bugs
-- =============================================

INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID, Type, EstimatedDays)
VALUES
    (@Feature1, 'Login fails', 'Valid credentials rejected', 2, 1, 'Bug', 1),
    (@Feature2, 'Duplicate cards', 'Cards appear twice', 3, 2, 'Bug', 2),
    (@Feature3, 'Incorrect sprint number', 'Sprint counter is incorrect', 1, 3, 'Bug', 1);

-- =============================================
-- Tasks
-- =============================================

INSERT INTO dbo.Tasks (WorkItemID, Title, Done)
VALUES
    (@Story1, 'Create login endpoint', 1),
    (@Story1, 'Validate credentials', 1),
    (@Story1, 'Implement login UI', 0),
    (@Story2, 'Create registration endpoint', 0),
    (@Story2, 'Implement registration UI', 0),
    (@Story3, 'Retrieve work items', 1),
    (@Story3, 'Render Kanban columns', 1),
    (@Story4, 'Implement move endpoint', 1),
    (@Story4, 'Implement drag and drop', 1);


-- =============================================
-- Completed work items from different sprints
-- =============================================

INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID,
     Type, EstimatedDays, SprintDone)
VALUES
    -- Sprint 1
    (@Feature1, 'Create user model', 'Define user properties',
     5, 1, 'UserStory', 2, 1),

    (@Feature2, 'Fix column alignment', 'Correct column spacing',
     5, 3, 'Bug', 1, 1),

    -- Sprint 2
    (@Feature1, 'Password validation', 'Validate password requirements',
     5, 2, 'UserStory', 3, 2),

    (@Feature2, 'Fix card overflow', 'Prevent cards overflowing columns',
     5, 2, 'Bug', 1, 2),

    -- Sprint 3
    (@Feature3, 'Sprint counter', 'Implement sprint tracking',
     5, 1, 'UserStory', 2, 3),

    (@Feature2, 'Fix card sorting', 'Correct work item ordering',
     5, 3, 'Bug', 1, 3);

UPDATE dbo.WorkItems
SET SprintDone = 3
WHERE WorkItemID = @Story4;

-- =============================================
-- Edge cases
-- =============================================

-- Feature without any work items
INSERT INTO dbo.Features (Title, Description)
VALUES ('Reporting', 'Future reporting functionality');

-- Work item without an associated feature
INSERT INTO dbo.WorkItems
    (FeatureID, Title, Description, StateID, PriorityID,
     Type, EstimatedDays)
VALUES
    (NULL, 'Improve error handling',
     'Implement global exception handling',
     1, 3, 'UserStory', NULL);


COMMIT TRANSACTION;
GO