using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Todo_App.API.Migrations
{
    public partial class TodoDoneDateColumnAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DoneDate",
                table: "Todos",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoneDate",
                table: "Todos");
        }
    }
}
