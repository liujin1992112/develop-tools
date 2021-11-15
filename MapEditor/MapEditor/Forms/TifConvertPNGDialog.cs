using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.IO;
using System.Windows.Forms;

namespace MapEditor.Forms
{
    public partial class TifConvertPNGDialog : Form
    {
        public TifConvertPNGDialog()
        {
            InitializeComponent();
        }

        private void ChooseTifDir_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            DialogResult result = dialog.ShowDialog();

            this.label_tif_dir_name.Text = dialog.SelectedPath;
        }

        private void ChoosePngDir_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            DialogResult result = dialog.ShowDialog();
            this.label_png_dir_name.Text = dialog.SelectedPath;
        }

        private void button_start_convert_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(this.label_png_dir_name.Text.Trim()) ||
                string.IsNullOrEmpty(this.label_tif_dir_name.Text.Trim()))
            {
                MessageBox.Show("tif文件夹或者png文件夹不能为空!");
                return;
            }

            string tifDir = this.label_tif_dir_name.Text.Trim();
            string[] files = Directory.GetFiles(tifDir, "*.tif", SearchOption.AllDirectories);
            foreach (string file in files)
            {
                Image image = Image.FromFile(file);

                int width = image.Width;
                int height = image.Height;
                Bitmap map = new Bitmap(width, height);//定义画布
                Graphics g = Graphics.FromImage(map);//定义画笔
                g.DrawImage(image, new Rectangle(0, 0, width, height));

                string filename = Path.GetFileNameWithoutExtension(file);
                map.Save(Path.Combine(this.label_png_dir_name.Text.Trim(), filename) + ".png");
            }

            MessageBox.Show("转换成功!");
            this.Close();
        }
    }
}
