using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MapEditor.Forms
{
    public partial class BmpConvertPNGDialog : Form
    {
        public BmpConvertPNGDialog()
        {
            InitializeComponent();
        }

        private void ChooseBmpDir_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            dialog.Description = "请选择bmp图片的文件目录";
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                this.label_bmp_dir_name.Text = dialog.SelectedPath;
            }
        }

        private void ChoosePngDir_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            dialog.Description = "请选择png图片的输出目录";
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                this.label_png_dir_name.Text = dialog.SelectedPath;
            }
        }

        private void button_start_convert_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(this.label_png_dir_name.Text.Trim()) ||
               string.IsNullOrEmpty(this.label_bmp_dir_name.Text.Trim()))
            {
                MessageBox.Show("bmp文件夹或者png文件夹不能为空!");
                return;
            }

            string tifDir = this.label_bmp_dir_name.Text.Trim();

            // 禁用按钮
            button_start_convert.Enabled = false;

            TaskScheduler ui = TaskScheduler.FromCurrentSynchronizationContext();

            Task.Factory.StartNew(() =>
            {
                string[] files = Directory.GetFiles(tifDir, "*.bmp", SearchOption.AllDirectories);
                foreach (string file in files)
                {
                    Image image = Image.FromFile(file);

                    int width = image.Width;
                    int height = image.Height;
                    Bitmap map = new Bitmap(width, height);//定义画布
                    //map.MakeTransparent();
                    //for (int i = 0; i < width; i++)
                    //{
                    //    for (int j = 0; j < height; j++)
                    //    {
                    //        Color c = map.GetPixel(i, j);
                    //        map.SetPixel(i, j, Color.FromArgb(0, c.G, 0));
                    //    }
                    //}
                    Graphics g = Graphics.FromImage(map);//定义画笔
                    g.DrawImage(image, new Rectangle(0, 0, width, height));

                    string filename = Path.GetFileNameWithoutExtension(file);
                    map.Save(Path.Combine(this.label_png_dir_name.Text.Trim(), filename) + ".png");
                }
            }).ContinueWith(m =>
            {
                button_start_convert.Enabled = true;
                MessageBox.Show("转换成功!");
                this.Close();
            }, ui);

        }
    }
}
