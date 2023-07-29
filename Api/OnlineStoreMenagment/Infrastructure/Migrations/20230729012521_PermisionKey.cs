using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PermisionKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRightPermision_Permisions_PermisionsId",
                table: "AccessRightPermision");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Permisions",
                table: "Permisions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AccessRightPermision",
                table: "AccessRightPermision");

            migrationBuilder.DropIndex(
                name: "IX_AccessRightPermision_PermisionsId",
                table: "AccessRightPermision");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Permisions");

            migrationBuilder.DropColumn(
                name: "PermisionsId",
                table: "AccessRightPermision");

            migrationBuilder.AddColumn<int>(
                name: "PermisionsType",
                table: "AccessRightPermision",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Permisions",
                table: "Permisions",
                column: "Type");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccessRightPermision",
                table: "AccessRightPermision",
                columns: new[] { "AccessRightsId", "PermisionsType" });

            migrationBuilder.CreateIndex(
                name: "IX_AccessRightPermision_PermisionsType",
                table: "AccessRightPermision",
                column: "PermisionsType");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRightPermision_Permisions_PermisionsType",
                table: "AccessRightPermision",
                column: "PermisionsType",
                principalTable: "Permisions",
                principalColumn: "Type",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRightPermision_Permisions_PermisionsType",
                table: "AccessRightPermision");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Permisions",
                table: "Permisions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AccessRightPermision",
                table: "AccessRightPermision");

            migrationBuilder.DropIndex(
                name: "IX_AccessRightPermision_PermisionsType",
                table: "AccessRightPermision");

            migrationBuilder.DropColumn(
                name: "PermisionsType",
                table: "AccessRightPermision");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Permisions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PermisionsId",
                table: "AccessRightPermision",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Permisions",
                table: "Permisions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AccessRightPermision",
                table: "AccessRightPermision",
                columns: new[] { "AccessRightsId", "PermisionsId" });

            migrationBuilder.CreateIndex(
                name: "IX_AccessRightPermision_PermisionsId",
                table: "AccessRightPermision",
                column: "PermisionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRightPermision_Permisions_PermisionsId",
                table: "AccessRightPermision",
                column: "PermisionsId",
                principalTable: "Permisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
