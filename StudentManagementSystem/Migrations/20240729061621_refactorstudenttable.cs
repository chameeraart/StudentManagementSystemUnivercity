using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class refactorstudenttable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdmissionDate",
                table: "students");

            migrationBuilder.DropColumn(
                name: "AdmissionGrade",
                table: "students");

            migrationBuilder.DropColumn(
                name: "BirthCertificateNumber",
                table: "students");

            migrationBuilder.DropColumn(
                name: "CurrentGrade",
                table: "students");

            migrationBuilder.DropColumn(
                name: "FinalGrade",
                table: "students");

            migrationBuilder.DropColumn(
                name: "FinalYear",
                table: "students");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AdmissionDate",
                table: "students",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "AdmissionGrade",
                table: "students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BirthCertificateNumber",
                table: "students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CurrentGrade",
                table: "students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FinalGrade",
                table: "students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FinalYear",
                table: "students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
