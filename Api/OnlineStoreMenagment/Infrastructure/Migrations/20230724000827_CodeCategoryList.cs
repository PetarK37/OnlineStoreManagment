using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CodeCategoryList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_DiscountCodes_DiscountCodeId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_DiscountCodeId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "DiscountCodeId",
                table: "Categories");

            migrationBuilder.CreateTable(
                name: "CategoryDiscountCode",
                columns: table => new
                {
                    CategoriesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DiscountCodeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryDiscountCode", x => new { x.CategoriesId, x.DiscountCodeId });
                    table.ForeignKey(
                        name: "FK_CategoryDiscountCode_Categories_CategoriesId",
                        column: x => x.CategoriesId,
                        principalTable: "Categories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryDiscountCode_DiscountCodes_DiscountCodeId",
                        column: x => x.DiscountCodeId,
                        principalTable: "DiscountCodes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryDiscountCode_DiscountCodeId",
                table: "CategoryDiscountCode",
                column: "DiscountCodeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryDiscountCode");

            migrationBuilder.AddColumn<Guid>(
                name: "DiscountCodeId",
                table: "Categories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_DiscountCodeId",
                table: "Categories",
                column: "DiscountCodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_DiscountCodes_DiscountCodeId",
                table: "Categories",
                column: "DiscountCodeId",
                principalTable: "DiscountCodes",
                principalColumn: "Id");
        }
    }
}
