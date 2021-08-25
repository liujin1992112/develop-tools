using System;
using System.Drawing;
using System.IO;
using System.Windows.Forms;

namespace MapEditor.Forms
{
    public partial class MergeImageDialog : Form
    {
        public MergeImageDialog()
        {
            InitializeComponent();
        }

        private void ButtonMergeImage_Click(object sender, EventArgs e)
        {
            int rows = 13;
            int cols = 24;
            int tileWidth = 256;
            int tileHeight = 256;
            string sceneid = "1010";
            string prefix = "tile";
            string extname = ".png";

            int maxWidth = cols * tileWidth;
            int maxHeight = rows * tileHeight;
            string dir = "E:\\white_snake_legend\\Client\\Assets\\GameRes\\Map2d\\1010\\tilemap_1010";

            Bitmap map = new Bitmap(maxWidth, maxHeight);//定义画布
            Graphics g = Graphics.FromImage(map);//定义画笔

            int x = 0, y = 0;

            //注意:WinForm的openGL坐标系(0,0)点在左上角,图片的坐标系在以左下角为(0,0)点
            //先遍历列
            for (int j = 0; j < cols; j++)
            {
                //再遍历行
                for (int i = 0; i < rows; i++)
                {
                    string imageName = string.Format("{0}_{1}_{2}_{3}{4}", prefix, sceneid, j, i, extname);
                    string path = string.Format("{0}\\{1}", dir, imageName);
                    
                    Image image = Image.FromStream(new MemoryStream(File.ReadAllBytes(path)));

                    x = j * tileWidth;
                    y = maxHeight - i * tileHeight - tileHeight;
                    g.DrawImage(image, new Rectangle(x, y, tileWidth, tileHeight));

                }
            }

            map.Save("E:\\test.png");
        }
    }
}
