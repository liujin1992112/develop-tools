using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
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

        private Graphics g;//画布
        private Pen gridPen = new Pen(Color.Black);//网格画笔
        private Brush brush = new SolidBrush(Color.Red);//填充画刷

        private MapData mapData = new MapData();

        private Image backgroundImage;

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
            this.DrawMap();
        }

        private void MapEditor_Paint(object sender, PaintEventArgs e)
        {
            this.DrawMap();
        }

        private void DrawMap()
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

            if (this.backgroundImage != null)
            {
                int srcBgWidth = Convert.ToInt32(this.backgroundImage.Width);
                int srcBgHeight = Convert.ToInt32(this.backgroundImage.Height);

                int destBgWidth = Convert.ToInt32(this.backgroundImage.Width * this.ratio);
                int destBgHeight = Convert.ToInt32(this.backgroundImage.Height * this.ratio);

                this.g.DrawImage(this.backgroundImage, new Rectangle(0, 0, destBgWidth, destBgHeight), 0, 0, srcBgWidth, srcBgHeight, GraphicsUnit.Pixel);
            }

            this.DrawGrid(rows, cols);

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    Tile tile;
                    if (this.mapData.TryGetTile(i, j, out tile))
                    {
                        this.DrawTile(i, j, true);
                    }
                }
            }
        }


        private void DrawBackground()
        {

        }

        private void DrawGrid(int rows, int cols)
        {
            //获取窗口大小
            int windowWidth = this.Width;
            int windowHeight = this.Height;

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
            this.DrawMap();
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
            this.DrawMap();
        }

        private void tb_tile_height_MouseLeave(object sender, EventArgs e)
        {
            this.DrawMap();
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
            if (this.tileHeight <= 0 || this.tileHeight <= 0) return;

            int row = e.Y / this.tileHeight;
            int col = e.X / this.tileWidth;

            this.DrawTile(row, col);
        }

        public void DrawTile(int row, int col, bool bRepaint = false)
        {
            if (this.mapData.HasTile(row, col))
            {
                if (bRepaint)
                {
                    int x = col * this.tileHeight;
                    int y = row * this.tileWidth;

                    this.g.FillRectangle(brush, x, y, this.tileWidth, this.tileHeight);
                }
            }
            else
            {
                this.mapData.Add(row, col, new Tile());

                int x = col * this.tileHeight;
                int y = row * this.tileWidth;

                this.g.FillRectangle(brush, x, y, this.tileWidth, this.tileHeight);
            }

        }

        private void MapEditor_MouseMove(object sender, MouseEventArgs e)
        {
            if (this.tileHeight <= 0 || this.tileHeight <= 0) return;

            int row = e.Y / this.tileHeight;
            int col = e.X / this.tileWidth;

            this.DrawTile(row, col);
        }

        private void load_map_button_Click(object sender, EventArgs e)
        {
            OpenFileDialog dialog = new OpenFileDialog();
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                string fileName = dialog.FileName;
                this.backgroundImage = Image.FromStream(new MemoryStream(File.ReadAllBytes(fileName)));
                this.DrawMap();
                Console.WriteLine(dialog.FileName);
            }
        }
    }
}
