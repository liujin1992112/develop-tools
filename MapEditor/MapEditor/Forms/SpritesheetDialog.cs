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
    public partial class SpritesheetDialog : Form
    {
        /// <summary>
        /// 选择的路径
        /// </summary>
        public string SelectedPath;

        /// <summary>
        /// 雪碧图的行数
        /// </summary>
        public int rows;

        /// <summary>
        /// 雪碧图的列数
        /// </summary>
        public int cols;

        /// <summary>
        /// 每一张雪碧图的宽度
        /// </summary>
        public int unitWidth;

        /// <summary>
        /// 每一张雪碧图的高度
        /// </summary>
        public int unitHeight;

        //public Settings setting = new Settings();

        public SpritesheetDialog()
        {
            InitializeComponent();
        }

        private void ButtonOpenFolder_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            DialogResult dialogResult = dialog.ShowDialog();
            if (dialogResult == DialogResult.OK)
            {
                this.SelectedPath = dialog.SelectedPath;
                this.textBoxDir.Text = this.SelectedPath;
            }
        }

        private void ButtonMake_Click(object sender, EventArgs e)
        {

            this.rows = (int)this.numericUpDownRows.Value;
            this.cols = (int)this.numericUpDownCols.Value;

            this.unitWidth = (int)this.numericUpDownUnitWidth.Value;
            this.unitHeight = (int)this.numericUpDownUnitHeight.Value;

            //string dir = this.textBoxDir.Text.Trim();
            string dir = "d:\\项目资料\\dior-vr\\2023-3-20\\fleurs2 (1) (1) 30帧-2";

            //string dir = this.textBoxDir.Text.Trim();
            //dir = "D:\\项目资料\\dior-vr\\2023-3-20\\Fleurs2 (1) (1) 30帧";
            if (!string.IsNullOrEmpty(dir))
            {
                List<string> filenameList = new List<string>();

                // 读取目录图片
                DirectoryInfo directory = new DirectoryInfo(dir);
                FileSystemInfo[] filesArray = directory.GetFileSystemInfos();
                foreach (var item in filesArray)
                {
                    filenameList.Add(item.FullName);
                }

                // 对雪碧图排序
                filenameList.Sort((string a, string b) => a.CompareTo(b));

                int count = filenameList.Count;
                this.rows = (count % this.cols == 0) ? (count / this.cols) : (count / this.cols + 1);

                this.numericUpDownRows.Value = this.rows;

                int maxWidth = this.unitWidth * this.cols;
                int maxHeight = this.unitHeight * this.rows;

                Bitmap map = new Bitmap(maxWidth, maxHeight);//定义画布
                Graphics g = Graphics.FromImage(map);//定义画笔

                int x = 0, y = 0;
                int tileWidth = this.unitWidth;
                int tileHeight = this.unitHeight;

                //注意:WinForm的openGL坐标系(0,0)点在左上角,图片的坐标系在以左下角为(0,0)点
                for (int i = 0; i < count; i++)
                {
                    x = (i % this.cols) * tileWidth;
                    y = (i / this.cols) * tileHeight;
                    string path = filenameList[i];
                    Console.WriteLine("处理:{0}", path);
                    Image image = Image.FromStream(new MemoryStream(File.ReadAllBytes(path)));
                    g.DrawImage(image, new Rectangle(x, y, tileWidth, tileHeight));
                    Console.WriteLine("处理:{0}完成", path);
                }

                map.Save("E:\\test.png");
            }
        }

        private void textBoxDir_DragDrop(object sender, DragEventArgs e)
        {

        }

        private void textBoxDir_DragEnter(object sender, DragEventArgs e)
        {
            Console.WriteLine(e);
        }
    }
}
