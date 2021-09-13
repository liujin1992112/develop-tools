using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace MapEditor.Forms
{
    public partial class SeparateRGBAndAlphaChannelDialog : Form
    {
        public SeparateRGBAndAlphaChannelDialog()
        {
            InitializeComponent();
        }

        private void BtnSeperate_Click(object sender, EventArgs e)
        {
            //string filePath = "E:\\test.png";
            //string rgbFilePath = "E:\\test_rgb.png";
            //string alphaFilePath = "E:\\test_alpha.png";

            string filePath = "E:\\white_snake_legend\\Client\\Assets\\GameRes\\Atlas\\StaticAtlas\\ActivityAtlas\\ActivityAtlas.png";
            string srcFilePath = "E:\\ActivityAtlas.png";
            string rgbFilePath = "E:\\ActivityAtlas_RGB_2x.png";
            string alphaFilePath = "E:\\ActivityAtlas_Alpha_2x.png";

            MemoryStream stream = new MemoryStream(File.ReadAllBytes(filePath));
            Image image = Image.FromStream(stream);
            var width = image.Width;
            var height = image.Height;

            Bitmap source = new Bitmap(image);
            Bitmap rgbTex = new Bitmap(width, height, PixelFormat.Format24bppRgb);
            Bitmap alphaTex = new Bitmap(width, height, PixelFormat.Format24bppRgb);

            for (int i = 0; i < width; i++)
            {
                for (int j = 0; j < height; j++)
                {
                    Color color = source.GetPixel(i, j);
                    rgbTex.SetPixel(i, j, Color.FromArgb(color.R, color.G, color.B));
                    alphaTex.SetPixel(i, j, Color.FromArgb(color.A, color.A, color.A));
                }
            }

            source.Save(srcFilePath);
            rgbTex.Save(rgbFilePath);
            alphaTex.Save(alphaFilePath);

            this.Hide();
        }
    }
}
