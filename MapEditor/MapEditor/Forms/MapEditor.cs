using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace MapEditor.Forms
{
    public partial class MapEditor : Form
    {
        private int tileWidth;
        private int tileHeight;

        private Graphics g;
        private Pen gridPen = new Pen(Color.Black);


        public MapEditor()
        {
            InitializeComponent();

        }

        private void MapEditor_Paint(object sender, PaintEventArgs e)
        {
            this.DrawGrid();
        }

        private void DrawGrid()
        {
            SetStyle(ControlStyles.SupportsTransparentBackColor, true);
            SetStyle(ControlStyles.AllPaintingInWmPaint, true);
            SetStyle(ControlStyles.UserPaint, true);
            SetStyle(ControlStyles.DoubleBuffer, true); ;

            //创建画布
            if (this.g != null)
            {
                this.g.Dispose();
            }
            this.g = this.CreateGraphics();

            this.tileWidth = int.Parse(this.tb_tile_width.Text);
            this.tileHeight = int.Parse(this.tb_tile_height.Text);

            //获取窗口大小
            int windowWidth = this.Width;
            int windowHeight = this.Height;

            int rows = windowHeight / tileHeight + 1;
            int cols = windowWidth / tileWidth + 1;

            //行
            for(int i = 0; i < rows; i++)
            {
                g.DrawLine(gridPen, 0, i * tileHeight, windowWidth, i * tileHeight); 
            }

            //列
            for (int j = 0; j < cols; j++)
            {
                g.DrawLine(gridPen, j * tileWidth, 0, j * tileWidth, windowHeight);
            }
        }

        private void MapEditor_Resize(object sender, EventArgs e)
        {
            this.DrawGrid();
        }

        private void tb_tile_width_TextChanged(object sender, EventArgs e)
        {
            //this.DrawGrid();
        }

        private void tb_tile_height_TextChanged(object sender, EventArgs e)
        {
        }

        private void tb_tile_width_MouseLeave(object sender, EventArgs e)
        {
            this.DrawGrid();
        }

        private void tb_tile_height_MouseLeave(object sender, EventArgs e)
        {
            this.DrawGrid();
        }
    }
}
