using KanbanBackend.Repositories.Interfaces;
using Microsoft.Data.SqlClient;

namespace KanbanBackend.Repositories;

public class WorkItemRepository : IWorkItemRepository
{
    private readonly string _connectionString;

    public WorkItemRepository(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string is missing.");
    }

    public async Task GetAllWorkItemsAsync()
    {
        await using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        const string sql = """
            SELECT 
                f.FeatureID,
                f.Title AS FeatureTitle,
                f.Description AS FeatureDescription,
                w.WorkItemID,
                w.Title AS WorkItemTitle,
                w.StateID,
                s.Name AS WorkItemState,
                w.Description AS WorkItemDescription,
                w.PriorityID,
                p.Name AS WorkItemPriority,
                w.Type AS WorkItemType,
                w.EstimatedDays AS WorkItemEstimatedDays,
                w.ParentWorkItemID,
                w.OwnerID,
                u.Name AS WorkItemOwner,
                w.UserNote,
                w.SprintDone,
                w.SortOrder,
                t.TaskID,
                t.Title AS TaskTitle,
                t.Done AS TaskDone
            FROM dbo.WorkItems AS w
            LEFT JOIN dbo.Features AS f
                ON w.FeatureID = f.FeatureID
            INNER JOIN dbo.States AS s
                ON w.StateID = s.StateID
            INNER JOIN dbo.Priorities AS p
                ON w.PriorityID = p.PriorityID
            LEFT JOIN dbo.Users AS u
                ON w.OwnerID = u.UserID
            LEFT JOIN dbo.Tasks AS t
                ON w.WorkItemID = t.WorkItemID
            ORDER BY
                w.StateID,
                w.SortOrder,
                w.PriorityID,
                w.FeatureID,
                w.WorkItemID,
                t.TaskID;
            """;

        await using var command = new SqlCommand(sql, connection);
        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            // TODO: Map results once models are available.
            Console.WriteLine(reader["WorkItemTitle"]);
        }
    }
}