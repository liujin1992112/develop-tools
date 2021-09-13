namespace MapEditor.Forms
{
    partial class SeparateRGBAndAlphaChannelDialog
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
            this.BtnSeperate = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // BtnSeperate
            // 
            this.BtnSeperate.Location = new System.Drawing.Point(275, 342);
            this.BtnSeperate.Name = "BtnSeperate";
            this.BtnSeperate.Size = new System.Drawing.Size(75, 23);
            this.BtnSeperate.TabIndex = 0;
            this.BtnSeperate.Text = "分离";
            this.BtnSeperate.UseVisualStyleBackColor = true;
            this.BtnSeperate.Click += new System.EventHandler(this.BtnSeperate_Click);
            // 
            // SeparateRGBAndAlphaChannelDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.BtnSeperate);
            this.Name = "SeparateRGBAndAlphaChannelDialog";
            this.Text = "分离图片RGB和Alpha透明通道";
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button BtnSeperate;
    }
}