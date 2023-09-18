using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AccessRightPErmision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Permisions_AccessRights_AccessRightId",
                table: "Permisions");

            migrationBuilder.DropTable(
                name: "UserAccessRights");

            migrationBuilder.DropIndex(
                name: "IX_Permisions_AccessRightId",
                table: "Permisions");

            migrationBuilder.DropColumn(
                name: "AccessRightId",
                table: "Permisions");

            migrationBuilder.CreateTable(
                name: "AccessRightPermision",
                columns: table => new
                {
                    AccessRightId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PermisionsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessRightPermision", x => new { x.AccessRightId, x.PermisionsId });
                    table.ForeignKey(
                        name: "FK_AccessRightPermision_AccessRights_AccessRightId",
                        column: x => x.AccessRightId,
                        principalTable: "AccessRights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccessRightPermision_Permisions_PermisionsId",
                        column: x => x.PermisionsId,
                        principalTable: "Permisions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccessRightPermision_PermisionsId",
                table: "AccessRightPermision",
                column: "PermisionsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessRightPermision");

            migrationBuilder.AddColumn<Guid>(
                name: "AccessRightId",
                table: "Permisions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserAccessRights",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccessRightId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAccessRights", x => x.id);
                    table.ForeignKey(
                        name: "FK_UserAccessRights_AccessRights_AccessRightId",
                        column: x => x.AccessRightId,
                        principalTable: "AccessRights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Permisions_AccessRightId",
                table: "Permisions",
                column: "AccessRightId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAccessRights_AccessRightId",
                table: "UserAccessRights",
                column: "AccessRightId");

            migrationBuilder.AddForeignKey(
                name: "FK_Permisions_AccessRights_AccessRightId",
                table: "Permisions",
                column: "AccessRightId",
                principalTable: "AccessRights",
                principalColumn: "Id");
        }
    }
}
