using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;

namespace MapEditor.Forms
{
    public partial class SplitImageDialog : Form
    {
        public SplitImageDialog()
        {
            InitializeComponent();
        }

        private void SplitImage_Click(object sender, EventArgs e)
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
            string filePath = "E:\\test.png";
            string dir = "E:\\";

            string sceneDir = string.Format("{0}\\{1}", dir, sceneid);
            if (!Directory.Exists(sceneDir))
            {
                Directory.CreateDirectory(sceneDir);
            }

            Image image = Image.FromStream(new MemoryStream(File.ReadAllBytes(filePath)));

            int x = 0, y = 0;
            for (int j = 0; j < cols; j++)
            {
                for (int i = 0; i < rows; i++)
                {
                    x = j * tileWidth;
                    y = maxHeight - i * tileHeight - tileHeight;

                    Bitmap tile = new Bitmap(tileWidth, tileHeight);
                    Graphics g = Graphics.FromImage(tile);
                    g.DrawImage(image, new Rectangle(0, 0, tileWidth, tileHeight), new Rectangle(x, y, tileWidth, tileHeight), GraphicsUnit.Pixel);

                    string imageName = string.Format("{0}_{1}_{2}_{3}{4}", prefix, sceneid, j, i, extname);
                    string output = string.Format("{0}\\{1}", sceneDir, imageName);
                    tile.Save(output);
                }
            }

        }
    }
}
