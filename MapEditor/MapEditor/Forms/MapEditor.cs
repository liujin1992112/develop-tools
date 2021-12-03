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

        private double ratio = 1;        //图片的起始显示比例
        private double ratioStep = 0.1;
        private double minRatio = 0.5;  //最小缩放比例
        private double maxRatio = 3;    //最大缩放比例

        private Graphics g;
        private Pen gridPen = new Pen(Color.Black);


        public MapEditor()
        {
            InitializeComponent();

            this.MouseWheel += MapEditor_MouseWheel;
        }

        private void MapEditor_MouseWheel(object sender, MouseEventArgs e)
        {
            //滚轮向前滚动，正值，放大；滚轮向后滚动，负值，缩小
            if (e.Delta > 0)
            {
                this.ratio += this.ratioStep;
                if (this.ratio >= this.maxRatio)
                {
                    this.ratio = this.maxRatio;
                }
            }
            else if (e.Delta < 0)
            {
                this.ratio -= this.ratioStep;
                if (this.ratio <= this.minRatio)
                {
                    this.ratio = this.minRatio;
                }
            }
            Console.WriteLine("ratio:{0}", this.ratio);
            this.DrawGrid();
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
            SetStyle(ControlStyles.DoubleBuffer, true);

            //创建画布
            if (this.g != null)
            {
                this.g.Clear(this.BackColor);
                this.g.Dispose();
            }
            this.g = this.CreateGraphics();

            this.tileWidth = Convert.ToInt32(Math.Floor(int.Parse(this.tb_tile_width.Text) * this.ratio));
            this.tileHeight = Convert.ToInt32(Math.Floor(int.Parse(this.tb_tile_height.Text) * this.ratio));

            Console.WriteLine("tileWidth:{0}  tileHeight:{1}", this.tileWidth, this.tileHeight);


            //获取窗口大小
            int windowWidth = this.Width;
            int windowHeight = this.Height;

            int rows = windowHeight / tileHeight + 1;
            int cols = windowWidth / tileWidth + 1;

            //行
            for (int i = 0; i < rows; i++)
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

        private void tb_tile_width_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!((e.KeyChar >= '0' && e.KeyChar <= '9') || e.KeyChar == ' '))//不输入输入除了数字之外的所有非法字符的判断
            {
                e.Handled = true;
            }
        }

        private void tb_tile_height_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!((e.KeyChar >= '0' && e.KeyChar <= '9') || e.KeyChar == ' '))//不输入输入除了数字之外的所有非法字符的判断
            {
                e.Handled = true;
            }
        }

        private void MapEditor_MouseClick(object sender, MouseEventArgs e)
        {
            this.FillTile(e);
        }

        public void FillTile(MouseEventArgs e)
        {
            int row = e.Y / this.tileHeight;
            int col = e.X / this.tileWidth;

            int x = col * this.tileHeight;
            int y = row * this.tileWidth;

            Brush brush = new SolidBrush(Color.Red);
            this.g.FillRectangle(brush, x, y, this.tileWidth, this.tileHeight);
            Console.WriteLine("x:{0} y:{1}", e.X, e.Y);
        }

        private void MapEditor_MouseMove(object sender, MouseEventArgs e)
        {
            this.FillTile(e);
        }
    }
}
