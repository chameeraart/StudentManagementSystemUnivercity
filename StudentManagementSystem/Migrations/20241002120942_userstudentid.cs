using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class userstudentid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "studentId",
                table: "users",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "studentId",
                table: "users");
        }
    }
}
