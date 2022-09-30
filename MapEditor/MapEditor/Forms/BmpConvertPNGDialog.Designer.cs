
namespace MapEditor.Forms
{
    partial class BmpConvertPNGDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.ChooseBmpDir = new System.Windows.Forms.Button();
            this.ChoosePngDir = new System.Windows.Forms.Button();
            this.button_start_convert = new System.Windows.Forms.Button();
            this.label_bmp_dir_name = new System.Windows.Forms.Label();
            this.label_png_dir_name = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // ChooseBmpDir
            // 
            this.ChooseBmpDir.Location = new System.Drawing.Point(60, 50);
            this.ChooseBmpDir.Name = "ChooseBmpDir";
            this.ChooseBmpDir.Size = new System.Drawing.Size(97, 23);
            this.ChooseBmpDir.TabIndex = 1;
            this.ChooseBmpDir.Text = "选择bmp文件夹";
            this.ChooseBmpDir.UseVisualStyleBackColor = true;
            this.ChooseBmpDir.Click += new System.EventHandler(this.ChooseBmpDir_Click);
            // 
            // ChoosePngDir
            // 
            this.ChoosePngDir.Location = new System.Drawing.Point(60, 178);
            this.ChoosePngDir.Name = "ChoosePngDir";
            this.ChoosePngDir.Size = new System.Drawing.Size(97, 23);
            this.ChoosePngDir.TabIndex = 3;
            this.ChoosePngDir.Text = "选择转换后png文件夹";
            this.ChoosePngDir.UseVisualStyleBackColor = true;
            this.ChoosePngDir.Click += new System.EventHandler(this.ChoosePngDir_Click);
            // 
            // button_start_convert
            // 
            this.button_start_convert.Location = new System.Drawing.Point(321, 327);
            this.button_start_convert.Name = "button_start_convert";
            this.button_start_convert.Size = new System.Drawing.Size(75, 23);
            this.button_start_convert.TabIndex = 5;
            this.button_start_convert.Text = "开始转换";
            this.button_start_convert.UseVisualStyleBackColor = true;
            this.button_start_convert.Click += new System.EventHandler(this.button_start_convert_Click);
            // 
            // label_bmp_dir_name
            // 
            this.label_bmp_dir_name.AutoSize = true;
            this.label_bmp_dir_name.Location = new System.Drawing.Point(175, 55);
            this.label_bmp_dir_name.Name = "label_bmp_dir_name";
            this.label_bmp_dir_name.Size = new System.Drawing.Size(41, 12);
            this.label_bmp_dir_name.TabIndex = 6;
            this.label_bmp_dir_name.Text = "label1";
            // 
            // label_png_dir_name
            // 
            this.label_png_dir_name.AutoSize = true;
            this.label_png_dir_name.Location = new System.Drawing.Point(175, 183);
            this.label_png_dir_name.Name = "label_png_dir_name";
            this.label_png_dir_name.Size = new System.Drawing.Size(41, 12);
            this.label_png_dir_name.TabIndex = 7;
            this.label_png_dir_name.Text = "label1";
            // 
            // BmpConvertPNGDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.label_png_dir_name);
            this.Controls.Add(this.label_bmp_dir_name);
            this.Controls.Add(this.button_start_convert);
            this.Controls.Add(this.ChoosePngDir);
            this.Controls.Add(this.ChooseBmpDir);
            this.Name = "BmpConvertPNGDialog";
            this.Text = "BmpConvertPNGDialog";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button ChooseBmpDir;
        private System.Windows.Forms.Button ChoosePngDir;
        private System.Windows.Forms.Button button_start_convert;
        private System.Windows.Forms.Label label_bmp_dir_name;
        private System.Windows.Forms.Label label_png_dir_name;
    }
}