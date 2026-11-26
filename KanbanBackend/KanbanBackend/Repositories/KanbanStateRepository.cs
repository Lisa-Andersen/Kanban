using KanbanBackend.Models;
using Microsoft.Data.SqlClient;
using KanbanBackend.Repositories.Interfaces;

namespace KanbanBackend.Repositories
{
    public class KanbanStateRepository : IKanbanStateRepository
    {
        private readonly string _connectionString;

        public KanbanStateRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string is missing.");
        }

        public async Task<List<KanbanState>> GetAllKanbanStatesAsync()
        {
            List<KanbanState> kanbanStates = new();

            await using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            const string sql = """
                SELECT StateID, Name
                FROM dbo.States
                ORDER BY StateID;
                """;

            await using var command = new SqlCommand(sql, connection);
            await using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                kanbanStates.Add(new KanbanState
                {
                    StateID = reader.GetInt32(0),
                    Name = reader.GetString(1)
                });
            }

            return kanbanStates;
        }
    }
}